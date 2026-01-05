import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents, summarizeIncidentHistory } from "@/lib/intel"
import { matchPlaybooksForPattern } from "@/lib/playbooks"
import { buildVoiceSummaryFromIncidents } from "@/lib/voice"

export async function GET() {
  const incidents = getRecentIncidents(100)
  const patterns = getIncidentPatterns()
  const summary = summarizeIncidentHistory()
  const voiceSummary = buildVoiceSummaryFromIncidents(summary)

  const matchedPlaybooks = Array.from(
    new Map(
      patterns
        .slice(0, 5)
        .flatMap((p) => matchPlaybooksForPattern(p))
        .map((pb) => [pb.id, pb]),
    ).values(),
  )

  return NextResponse.json({ incidents, patterns, summary, voiceSummary, playbooks: matchedPlaybooks })
}
