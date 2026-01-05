import type { IncidentPattern, IncidentRecord, PrimeBriefing, PrimeInsight } from "@/lib/types"

export function correlateAcrossTenants(incidents: IncidentRecord[]): IncidentRecord[] {
  return incidents
}

export function detectGlobalPatterns(patterns: IncidentPattern[]): IncidentPattern[] {
  return patterns.slice(0, 5)
}

export function computeGlobalReliabilityScore(incidents: IncidentRecord[]): number {
  if (!incidents.length) return 95
  const failures = incidents.filter((i) => i.actionType === "fix-failed").length
  const rollbacks = incidents.filter((i) => i.actionType === "rollback-executed").length
  const score = Math.max(40, 98 - failures * 2 - rollbacks * 1.5)
  return Number(score.toFixed(1))
}

export function generatePrimeInsights(incidents: IncidentRecord[], patterns: IncidentPattern[]): PrimeInsight[] {
  const reliabilityScore = computeGlobalReliabilityScore(incidents)
  const topPattern = patterns[0]
  const insights: PrimeInsight[] = []
  insights.push({
    id: `prime-${Date.now().toString(36)}`,
    title: "Global reliability posture",
    narrative: `Reliability holding at score ${reliabilityScore}. Key watch area: ${topPattern ? topPattern.key : "none"}.`,
    reliabilityScore,
    scope: "global",
  })
  if (topPattern) {
    insights.push({
      id: `prime-pattern-${topPattern.key}`,
      title: "Dominant recurring signal",
      narrative: `${topPattern.key} appears ${topPattern.occurrences} times across tenants.`,
      reliabilityScore,
      scope: "global",
    })
  }
  return insights
}

export function generatePrimeBriefing(incidents: IncidentRecord[], patterns: IncidentPattern[]): PrimeBriefing {
  const reliabilityScore = computeGlobalReliabilityScore(incidents)
  const highlights: string[] = []
  highlights.push(`Reliability score: ${reliabilityScore}`)
  if (patterns.length) highlights.push(`Top global pattern: ${patterns[0].key}`)
  return {
    headline: "Operator Prime global briefing",
    highlights,
    reliabilityScore,
  }
}
