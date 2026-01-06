import type {
  CognitionConfidence,
  CognitionRationale,
  CognitionTrace,
  CognitiveDriftReport,
  CognitiveStabilityScore,
  IncidentPattern,
  IncidentRecord,
  PrimeCognitionBundle,
} from "@/lib/types"

function scoreFromIncidents(incidents: IncidentRecord[]): number {
  if (!incidents.length) return 0.82
  const failures = incidents.filter((i) => i.actionType === "fix-failed").length
  const rollbacks = incidents.filter((i) => i.actionType === "rollback-executed").length
  const total = incidents.length
  const penalty = (failures * 0.08 + rollbacks * 0.05) / Math.max(1, total)
  return Number(Math.max(0.35, 0.9 - penalty).toFixed(2))
}

function buildConfidences(incidents: IncidentRecord[], patterns: IncidentPattern[]): CognitionConfidence[] {
  const score = scoreFromIncidents(incidents)
  const list: CognitionConfidence[] = []
  list.push({ target: "diagnosis", score, rationale: "Based on recent stability and failure ratio" })
  list.push({ target: "prediction", score: Number((score - 0.05).toFixed(2)), rationale: "Adjusted for forecast uncertainty" })
  if (patterns.length) {
    list.push({ target: "warning", score: Number(Math.min(0.95, score + 0.05).toFixed(2)), rationale: "Hotspot alignment" })
  }
  return list
}

function buildRationales(patterns: IncidentPattern[]): CognitionRationale[] {
  if (!patterns.length) return [{ summary: "Sparse signals", factors: ["No strong recurring patterns detected"] }]
  const top = patterns[0]
  return [
    {
      summary: "Pattern-driven confidence",
      factors: [
        `Top pattern ${top.key} seen ${top.occurrences} times`,
        `Pattern reliability hints: success ${top.successCount ?? 0}, failure ${top.failureCount ?? 0}`,
      ],
    },
  ]
}

function buildTrace(patterns: IncidentPattern[]): CognitionTrace {
  const steps = [] as string[]
  if (!patterns.length) {
    steps.push("Gathered incidents")
    steps.push("No dominant pattern; fallback to base confidence")
    return { steps, conclusion: "Confidence based on low-signal environment" }
  }
  const top = patterns[0]
  steps.push("Gathered incidents")
  steps.push(`Identified hotspot ${top.key}`)
  steps.push("Adjusted confidence using hotspot weight")
  return { steps, conclusion: "Confidence guided by hotspot presence" }
}

function detectDrift(incidents: IncidentRecord[], patterns: IncidentPattern[]): CognitiveDriftReport {
  const recent = incidents.slice(0, 30)
  const uniqueSources = new Set(recent.map((i) => i.source).filter(Boolean))
  const driftScore = Number(Math.min(1, uniqueSources.size / 20).toFixed(2))
  const status: CognitiveDriftReport["status"] = driftScore > 0.4 ? "drifting" : driftScore > 0.25 ? "watch" : "stable"
  const indicators: string[] = []
  indicators.push(`Unique sources (recent): ${uniqueSources.size}`)
  if (patterns.length) indicators.push(`Top pattern: ${patterns[0].key}`)
  return { status, indicators, driftScore }
}

function buildStability(confidences: CognitionConfidence[]): CognitiveStabilityScore {
  const avg = confidences.reduce((acc, c) => acc + c.score, 0) / Math.max(1, confidences.length)
  const score = Number(Math.min(1, Math.max(0.35, avg))).toFixed(2)
  return {
    score: Number(score),
    factors: [`Average confidence ${score}`, "Deterministic scoring", "Bounded rationale"],
  }
}

export function buildPrimeCognitionBundle(incidents: IncidentRecord[], patterns: IncidentPattern[]): PrimeCognitionBundle {
  const confidences = buildConfidences(incidents, patterns)
  const rationales = buildRationales(patterns)
  const traces = [buildTrace(patterns)]
  const drift = detectDrift(incidents, patterns)
  const stability = buildStability(confidences)

  return {
    confidences,
    rationales,
    traces,
    drift,
    stability,
  }
}
