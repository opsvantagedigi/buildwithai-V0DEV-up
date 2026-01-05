import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents } from "@/lib/intel"
import { listKnowledgeArticles } from "@/lib/knowledge"
import { buildOperatorPrimeBundle } from "@/lib/operator-prime"
import { listPlaybooks } from "@/lib/playbooks"

export async function GET() {
  const incidents = getRecentIncidents(200)
  const patterns = getIncidentPatterns(15)
  const playbooks = listPlaybooks()
  const articles = listKnowledgeArticles()

  const operatorPrime = buildOperatorPrimeBundle({ incidents, patterns, playbooks, articles })

  return NextResponse.json({
    primeBriefing: operatorPrime.primeBriefing,
    primeInsights: operatorPrime.primeInsights,
    primeInsightsFeed: operatorPrime.primeFeed,
    primeWeeklyReport: operatorPrime.primeWeeklyReport,
    primeMonthlyDigest: operatorPrime.primeMonthlyDigest,
    globalReliabilityScore: operatorPrime.globalReliabilityScore,
    cognition: operatorPrime.cognition,
    autonomy: operatorPrime.autonomy,
    knowledgeBrain: operatorPrime.knowledgeBrain,
    primeNarrative: operatorPrime.primeNarrative,
  })
}
