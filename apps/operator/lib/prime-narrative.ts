import type { OperatorPersona, PrimeBriefing, PrimeInsight, PrimeNarrativeBundle } from "@/lib/types"

export function generatePrimeWeeklyReport(insights: PrimeInsight[]): string[] {
  return insights.map((i) => `${i.title}: ${i.narrative}`)
}

export function generatePrimeMonthlyDigest(insights: PrimeInsight[]): string[] {
  return insights.slice(0, 7).map((i) => `Monthly: ${i.title} (${i.reliabilityScore})`)
}

export function generatePrimeInsightsFeed(insights: PrimeInsight[]): string[] {
  return insights.slice(0, 5).map((i) => `${i.scope.toUpperCase()}: ${i.title} — ${i.narrative}`)
}

export function generatePrimeBriefingMode(persona: OperatorPersona, briefing: PrimeBriefing): string[] {
  const lines: string[] = []
  lines.push(`${briefing.headline} — Persona: ${persona.name}`)
  lines.push(`Reliability: ${briefing.reliabilityScore}`)
  briefing.highlights.forEach((h) => lines.push(h))
  return lines
}

export function generatePrimeNarrativeBundle(params: {
  insights: PrimeInsight[]
  briefing: PrimeBriefing
  persona: OperatorPersona
}): PrimeNarrativeBundle {
  const { insights, briefing, persona } = params
  const weekly = generatePrimeWeeklyReport(insights)
  const monthly = generatePrimeMonthlyDigest(insights)
  const feed = generatePrimeInsightsFeed(insights)
  const briefingLines = generatePrimeBriefingMode(persona, briefing)

  return {
    headline: briefing.headline,
    weekly,
    monthly,
    feed,
    briefing: briefingLines,
  }
}
