import { buildPrimeCognitionBundle } from "@/lib/prime-cognition"
import { computeAutonomyBundle } from "@/lib/prime-autonomy"
import { generatePrimeInsightsFeed, generatePrimeNarrativeBundle, generatePrimeWeeklyReport, generatePrimeMonthlyDigest } from "@/lib/prime-narrative"
import { generatePrimeBriefing, generatePrimeInsights, computeGlobalReliabilityScore } from "@/lib/prime-intel"
import { knowledgeBrainBundle } from "@/lib/prime-knowledge"
import { defaultPersona } from "@/lib/persona"
import type { IncidentPattern, IncidentRecord, KnowledgeArticle, OperatorPersona, Playbook, PrimeInsight, PrimeNarrativeBundle, RemediationProposal } from "@/lib/types"

export function buildOperatorPrimeBundle(input: {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  proposals?: RemediationProposal[]
  playbooks?: Playbook[]
  articles?: KnowledgeArticle[]
  persona?: OperatorPersona
}): {
  cognition: ReturnType<typeof buildPrimeCognitionBundle>
  autonomy: ReturnType<typeof computeAutonomyBundle>
  primeInsights: PrimeInsight[]
  primeBriefing: ReturnType<typeof generatePrimeBriefing>
  primeNarrative: PrimeNarrativeBundle
  primeFeed: string[]
  primeWeeklyReport: string[]
  primeMonthlyDigest: string[]
  globalReliabilityScore: number
  knowledgeBrain: ReturnType<typeof knowledgeBrainBundle>
} {
  const persona = input.persona ?? defaultPersona
  const incidents = input.incidents
  const patterns = input.patterns
  const cognition = buildPrimeCognitionBundle(incidents, patterns)
  const autonomy = computeAutonomyBundle(incidents)
  const primeInsights = generatePrimeInsights(incidents, patterns)
  const primeBriefing = generatePrimeBriefing(incidents, patterns)
  const primeNarrative = generatePrimeNarrativeBundle({ insights: primeInsights, briefing: primeBriefing, persona })
  const primeFeed = generatePrimeInsightsFeed(primeInsights)
  const primeWeeklyReport = generatePrimeWeeklyReport(primeInsights)
  const primeMonthlyDigest = generatePrimeMonthlyDigest(primeInsights)
  const globalReliabilityScore = computeGlobalReliabilityScore(incidents)
  const knowledgeBrain = knowledgeBrainBundle({
    incidents,
    patterns,
    proposals: input.proposals ?? [],
    playbooks: input.playbooks ?? [],
    articles: input.articles ?? [],
  })

  return {
    cognition,
    autonomy,
    primeInsights,
    primeBriefing,
    primeNarrative,
    primeFeed,
    primeWeeklyReport,
    primeMonthlyDigest,
    globalReliabilityScore,
    knowledgeBrain,
  }
}
