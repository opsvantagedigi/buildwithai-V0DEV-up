import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents } from "@/lib/intel"
import { defaultPersona } from "@/lib/persona"
import { generatePrimeBriefing, generatePrimeInsights } from "@/lib/prime-intel"
import { generatePrimeNarrativeBundle } from "@/lib/prime-narrative"

export async function GET() {
  const incidents = getRecentIncidents(200)
  const patterns = getIncidentPatterns(20)
  const primeInsights = generatePrimeInsights(incidents, patterns)
  const primeBriefing = generatePrimeBriefing(incidents, patterns)
  const primeNarrative = generatePrimeNarrativeBundle({ insights: primeInsights, briefing: primeBriefing, persona: defaultPersona })

  return NextResponse.json({ primeNarrative, primeBriefing, primeInsights })
}
