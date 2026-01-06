import { summarizeIncidentHistoryForDiagnostics } from "@/lib/intel"
import type { MonitoringEvent, Diagnosis, RiskLevel } from "@/lib/types"

function mapSeverityToRisk(severity?: MonitoringEvent["severity"]): RiskLevel {
  if (severity === "critical") return "high"
  if (severity === "error") return "medium"
  return "low"
}

export function analyzeEvents(events: MonitoringEvent[]): Diagnosis[] {
  return events.map((event) => ({
    id: `diag-${event.id}`,
    eventId: event.id,
    summary: `Detected ${event.kind} issue from ${event.source}: ${event.message}`,
    evidence: [event.message],
    suspectedCauses: [
      event.kind === "error"
        ? "Unhandled exception or API failure"
        : event.kind === "latency"
        ? "Slow API or heavy computation"
        : event.kind === "uptime"
        ? "Service outage or deployment issue"
        : "General anomaly",
    ],
    confidence: 0.7,
    severity: event.severity,
    risk: mapSeverityToRisk(event.severity),
  }))
}

export function annotateDiagnosesWithHistory(diagnoses: Diagnosis[]): Diagnosis[] {
  const history = summarizeIncidentHistoryForDiagnostics(diagnoses)
  return diagnoses.map((diag) => {
    const h = history[diag.id]
    if (!h) return diag
    const historyScore = (h.successes ?? 0) - (h.failures ?? 0) + (h.occurrences ?? 0)
    return {
      ...diag,
      occurrenceCount: h.occurrences,
      historyScore,
      historicallyFragile: (h.failures ?? 0) > (h.successes ?? 0),
      historicallyReliable: (h.successes ?? 0) >= 2 && (h.failures ?? 0) === 0,
      hotspot: (h.occurrences ?? 0) >= 3,
    }
  })
}

export function rankDiagnosesByHistory(diagnoses: Diagnosis[]): Diagnosis[] {
  const annotated = annotateDiagnosesWithHistory(diagnoses)
  return [...annotated].sort((a, b) => {
    const aScore = (a.occurrenceCount ?? 0) + (a.historyScore ?? 0)
    const bScore = (b.occurrenceCount ?? 0) + (b.historyScore ?? 0)
    if (aScore === bScore) return (b.confidence ?? 0) - (a.confidence ?? 0)
    return bScore - aScore
  })
}
