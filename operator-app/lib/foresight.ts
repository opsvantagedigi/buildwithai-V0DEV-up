import { getIncidentHotspots, getRecentIncidents, summarizeIncidentHistory } from "@/lib/intel"
import type {
  EarlyWarning,
  ForesightPrediction,
  IncidentPattern,
  IncidentRecord,
  IncidentSummary,
  RiskLevel,
  StabilityIndex,
  SimpleTrend,
} from "@/lib/types"

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function inferLevel(score: number): StabilityIndex["level"] {
  if (score >= 75) return "calm"
  if (score >= 45) return "watch"
  return "critical"
}

export function computeStabilityIndex(summary?: IncidentSummary, trends?: SimpleTrend[]): StabilityIndex {
  const now = new Date().toISOString()
  if (!summary) {
    return {
      score: 80,
      level: "calm",
      factors: ["No summary available; defaulting to calm."],
      computedAt: now,
    }
  }

  const baseScore = 100
  const penaltyFailures = summary.fixFailureCount * 5
  const penaltyRollbacks = summary.rollbackCount * 4
  const penaltyHighRisk = summary.highRiskBlockedCount * 6
  const penaltyIncidents = Math.max(0, summary.totalIncidents - 2) * 2

  let score = baseScore - (penaltyFailures + penaltyRollbacks + penaltyHighRisk + penaltyIncidents)

  const volumeTrend = trends?.find((t) => t.label === "incident-volume")
  if (volumeTrend) {
    if (volumeTrend.direction === "up") score -= Math.round(10 * volumeTrend.confidence)
    if (volumeTrend.direction === "down") score += Math.round(6 * volumeTrend.confidence)
  }

  score = clampScore(score)

  const factors: string[] = []
  factors.push(`Incidents: ${summary.totalIncidents}`)
  factors.push(`Failures: ${summary.fixFailureCount}, rollbacks: ${summary.rollbackCount}`)
  if (summary.highRiskBlockedCount) factors.push(`High-risk blocks: ${summary.highRiskBlockedCount}`)
  if (volumeTrend) factors.push(`Trend: ${volumeTrend.direction} (confidence ${volumeTrend.confidence})`)

  return {
    score,
    level: inferLevel(score),
    factors,
    computedAt: now,
  }
}

export function detectPrecursors(incidents: IncidentRecord[], patterns: IncidentPattern[]): EarlyWarning[] {
  const warnings: EarlyWarning[] = []
  const recentCritical = incidents.filter((i) => i.severity === "critical").slice(0, 3)
  if (recentCritical.length) {
    warnings.push({
      id: `warn-critical-${recentCritical[0].id}`,
      title: "Critical signals detected",
      severity: "high",
      rationale: `${recentCritical.length} critical events observed in recent history.`,
      actions: ["Verify affected subsystems", "Prepare rollback safeguards"],
      window: "immediate",
      source: "foresight",
    })
  }

  const hotspots = patterns.filter((p) => p.occurrences >= 3).slice(0, 2)
  if (hotspots.length) {
    warnings.push({
      id: `warn-hotspot-${hotspots[0].key}`,
      title: "Recurring hotspot emerging",
      severity: "medium",
      rationale: hotspots.map((p) => `${p.key} (${p.occurrences}x)`).join("; "),
      actions: ["Schedule deep-dive on hotspot", "Line up mitigation playbooks"],
      window: "short-term",
      source: "foresight",
    })
  }

  return warnings
}

export function predictIncidentRisk(incidents: IncidentRecord[], patterns: IncidentPattern[]): ForesightPrediction[] {
  const predictions: ForesightPrediction[] = []
  const total = incidents.length
  const failures = incidents.filter((i) => i.actionType === "fix-failed").length
  const rollbacks = incidents.filter((i) => i.actionType === "rollback-executed").length

  const likelihood = Math.min(0.95, total > 0 ? (failures + rollbacks + 1) / (total + 2) : 0.15)
  const horizon: ForesightPrediction["horizon"] = total > 20 ? "mid" : "short"
  const drivers: string[] = []
  if (failures) drivers.push(`Recent failures: ${failures}`)
  if (rollbacks) drivers.push(`Rollbacks: ${rollbacks}`)
  const topPattern = patterns[0]
  if (topPattern) drivers.push(`Hot pattern: ${topPattern.key}`)

  predictions.push({
    id: `pred-${Date.now().toString(36)}`,
    likelihood: Number(likelihood.toFixed(2)),
    impact: failures + rollbacks > 2 ? "high" : failures > 0 ? "medium" : "low",
    summary: "Upcoming incident risk based on recent instability signals.",
    drivers,
    horizon,
  })

  return predictions
}

export function generateEarlyWarnings() {
  const incidents = getRecentIncidents(120)
  const patterns = getIncidentHotspots(10)
  const summary = summarizeIncidentHistory()
  const warnings = detectPrecursors(incidents, patterns)
  const predictions = predictIncidentRisk(incidents, patterns)
  const stability = computeStabilityIndex(summary)

  return { stability, warnings, predictions }
}
