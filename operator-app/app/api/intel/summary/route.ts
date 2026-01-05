import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents, summarizeIncidentHistory } from "@/lib/intel"
import { matchPlaybooksForPattern } from "@/lib/playbooks"
import { buildVoiceSummaryFromIncidents } from "@/lib/voice"
import { inferIncidentTrends } from "@/lib/trends"
import { generateEarlyWarnings } from "@/lib/foresight"
import { buildPrimeCognitionBundle } from "@/lib/prime-cognition"
import { computeAutonomyBundle } from "@/lib/prime-autonomy"

export async function GET() {
  const incidents = getRecentIncidents(100)
  const patterns = getIncidentPatterns()
  const summary = summarizeIncidentHistory()
  const voiceSummary = buildVoiceSummaryFromIncidents(summary)
  const trends = inferIncidentTrends(incidents)
  const { stability, warnings, predictions } = generateEarlyWarnings()
  const cognition = buildPrimeCognitionBundle(incidents, patterns)
  const autonomyBundle = computeAutonomyBundle(incidents)

  const matchedPlaybooks = Array.from(
    new Map(
      patterns
        .slice(0, 5)
        .flatMap((p) => matchPlaybooksForPattern(p))
        .map((pb) => [pb.id, pb]),
    ).values(),
  )

  return NextResponse.json({
    incidents,
    patterns,
    summary,
    voiceSummary,
    trends,
    stabilityIndex: stability,
    earlyWarnings: warnings,
    foresightPredictions: predictions,
    cognition,
    autonomySimulations: autonomyBundle.autonomySimulations,
    strategyScores: autonomyBundle.strategyScores,
    reliabilityForecast: autonomyBundle.reliabilityForecast,
    playbooks: matchedPlaybooks,
  })
}
