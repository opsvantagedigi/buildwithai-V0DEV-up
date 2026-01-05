import { getIncidentHotspots, getRecentIncidents, summarizeIncidentHistoryForSources } from "@/lib/intel"
import { matchPlaybooksForDiagnosis } from "./playbooks"
import type {
  Diagnosis,
  IncidentPattern,
  IncidentRecord,
  MonitoringEvent,
  PredictiveFixSuggestion,
  RemediationStep,
} from "@/lib/types"

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

function defaultSteps(): RemediationStep[] {
  return [
    { description: "Collect logs and recent traces for the affected service" },
    { description: "Check recent deployments or feature flags for regressions" },
    { description: "Validate API/endpoint health and error handling" },
    { description: "Prepare rollback or mitigation toggle if risk increases" },
  ]
}

function stepsFromPlaybook(playbookSteps: { description: string }[] | undefined): RemediationStep[] {
  if (!playbookSteps?.length) return defaultSteps()
  return playbookSteps.map((s) => ({ description: s.description }))
}

function findPatternForDiagnosis(patterns: IncidentPattern[], diag: Diagnosis): IncidentPattern | undefined {
  return patterns.find(
    (p) =>
      p.key === diag.summary ||
      (diag.summary && diag.summary.toLowerCase().includes(p.key.toLowerCase())) ||
      (p.relatedDiagnosisIds ?? []).includes(diag.id),
  )
}

function relatedIncidents(diag: Diagnosis, incidents: IncidentRecord[]) {
  return incidents.filter(
    (rec) =>
      rec.diagnosisId === diag.id ||
      rec.summary === diag.summary ||
      (rec.source && diag.summary.toLowerCase().includes(rec.source.toLowerCase())) ||
      (rec.eventId && rec.eventId === diag.eventId),
  )
}

export function generatePredictiveSuggestions(diagnoses: Diagnosis[]): PredictiveFixSuggestion[] {
  if (!diagnoses.length) return []

  const incidents = getRecentIncidents(300)
  const patterns = getIncidentHotspots(15)
  const suggestions: PredictiveFixSuggestion[] = []

  diagnoses.forEach((diag) => {
    const matchedPattern = findPatternForDiagnosis(patterns, diag)
    const related = relatedIncidents(diag, incidents)
    const playbooks = matchPlaybooksForDiagnosis(diag)

    const freq = related.length
    const historyScore = diag.historyScore ?? 0
    const patternWeight = matchedPattern ? matchedPattern.occurrences : 0
    const rawConfidence = 0.35 + Math.min(0.5, freq * 0.05 + patternWeight * 0.04 + historyScore * 0.05)
    const confidence = Number(Math.min(0.95, rawConfidence).toFixed(2))

    const rationaleParts: string[] = []
    if (matchedPattern) rationaleParts.push(`Recurring pattern: ${matchedPattern.key} (${matchedPattern.occurrences}x)`)
    if (freq > 0) rationaleParts.push(`Seen in ${freq} similar incident${freq === 1 ? "" : "s"}`)
    if (playbooks.length) rationaleParts.push(`Playbook match: ${playbooks[0].name}`)

    const steps = playbooks.length
      ? stepsFromPlaybook(playbooks[0].steps)
      : defaultSteps()

    suggestions.push({
      id: makeId("predictive"),
      diagnosisId: diag.id,
      patternKey: matchedPattern?.key,
      confidence,
      summary: matchedPattern ? `Likely recurrence: ${matchedPattern.key}` : `Proactive mitigation for ${diag.summary}`,
      suggestedSteps: steps,
      risk: diag.risk,
      rationale: rationaleParts.join("; "),
      basedOnIncidents: related.slice(0, 10).map((r) => r.id),
    })
  })

  return suggestions
}

export function suggestProactiveChecks(events: MonitoringEvent[]): PredictiveFixSuggestion[] {
  if (!events.length) return []

  const sourceCounts = summarizeIncidentHistoryForSources(events)
  const suggestions: PredictiveFixSuggestion[] = []

  events.forEach((evt) => {
    if (evt.severity === "info") return
    const isWarning = evt.severity === "warning"
    const isLatency = evt.kind === "latency"
    if (!isWarning && !isLatency) return

    const freq = sourceCounts[evt.source] ?? 0
    const confidence = Number(Math.min(0.6, 0.25 + freq * 0.05).toFixed(2))

    suggestions.push({
      id: makeId("proactive"),
      diagnosisId: undefined,
      patternKey: undefined,
      confidence,
      summary: isLatency ? `Performance check for ${evt.source}` : `Pre-emptive check for ${evt.source}`,
      suggestedSteps: [
        { description: "Verify current latency/error budgets for the service" },
        { description: "Capture a short burst of logs and traces to establish baseline" },
        { description: "Validate health checks and retry/backoff configuration" },
      ],
      risk: "low",
      rationale: `Detected ${isLatency ? "latency" : "warning"} signals (count ${freq || 1}). Acting early to avoid incidents.`,
    })
  })

  return suggestions
}
