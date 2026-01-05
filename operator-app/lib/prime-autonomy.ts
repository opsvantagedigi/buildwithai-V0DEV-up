import type { AutonomySimulation, FixStrategyScore, IncidentRecord, ReliabilityForecast, RiskLevel } from "@/lib/types"

function riskFromString(risk?: RiskLevel): number {
  if (risk === "high") return 0.8
  if (risk === "medium") return 0.5
  return 0.2
}

export function simulateAutonomy(incidents: IncidentRecord[]): AutonomySimulation[] {
  const sims: AutonomySimulation[] = []
  const recent = incidents.slice(0, 5)
  recent.forEach((inc, idx) => {
    sims.push({
      id: `sim-${inc.id}-${idx}`,
      description: inc.summary ? `Dry-run mitigation for ${inc.summary}` : "Dry-run mitigation",
      risk: inc.risk ?? "medium",
      outcome: "pass",
      steps: ["Assess blast radius", "Simulate fix steps", "Validate rollback pre-checks"],
      approvalsNeeded: inc.risk === "high" ? 2 : 1,
    })
  })
  if (!sims.length) {
    sims.push({
      id: "sim-empty",
      description: "Baseline autonomy dry-run",
      risk: "low",
      outcome: "uncertain",
      steps: ["No incidents present", "Maintain guardrails"],
      approvalsNeeded: 0,
    })
  }
  return sims
}

export function scoreFixStrategies(incidents: IncidentRecord[]): FixStrategyScore[] {
  const strategies = [
    { name: "rollback-first", weight: 0.6 },
    { name: "retry-then-rollback", weight: 0.7 },
    { name: "bluegreen-shift", weight: 0.8 },
  ]
  return strategies.map((s, idx) => ({
    strategy: s.name,
    score: Number((s.weight - idx * 0.05).toFixed(2)),
    rationale: "Deterministic heuristic based on stability preference",
  }))
}

export function forecastReliability(incidents: IncidentRecord[]): ReliabilityForecast {
  const failureRate = incidents.filter((i) => i.actionType === "fix-failed").length / Math.max(1, incidents.length)
  const rollbackRate = incidents.filter((i) => i.actionType === "rollback-executed").length / Math.max(1, incidents.length)
  const score = Number(Math.max(0.4, 0.9 - failureRate * 0.6 - rollbackRate * 0.4).toFixed(2))
  return {
    score,
    horizon: incidents.length > 30 ? "mid" : "short",
    rationale: [
      `Failure rate: ${failureRate.toFixed(2)}`,
      `Rollback rate: ${rollbackRate.toFixed(2)}`,
      "Prefers conservative autonomy trajectory",
    ],
  }
}

export function computeAutonomyBundle(incidents: IncidentRecord[]) {
  const autonomySimulations = simulateAutonomy(incidents)
  const strategyScores = scoreFixStrategies(incidents)
  const reliabilityForecast = forecastReliability(incidents)
  return { autonomySimulations, strategyScores, reliabilityForecast }
}
