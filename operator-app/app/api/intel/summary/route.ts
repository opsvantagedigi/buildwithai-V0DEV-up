import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents, summarizeIncidentHistory } from "@/lib/intel"

export async function GET() {
  const incidents = getRecentIncidents(100)
  const patterns = getIncidentPatterns()
  const summary = summarizeIncidentHistory()

  return NextResponse.json({ incidents, patterns, summary })
}
