import { NextResponse } from "next/server"
import type { Diagnosis, MonitoringEvent, RemediationProposal } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body)
    ? body
    : body && Array.isArray(body.events)
    ? body.events
    : []

  const firstEventId = events[0]?.id ?? "event-1"

  const diagnoses: Diagnosis[] = [
    {
      id: "diag-1",
      eventId: firstEventId,
      summary: "Mock diagnosis",
      evidence: [],
      suspectedCauses: [],
      confidence: 0.5,
    },
  ]

  const proposals: RemediationProposal[] = [
    {
      id: "prop-1",
      diagnosisId: "diag-1",
      steps: [],
      risk: "low",
      expectedImpact: "Mock impact",
      requiresApproval: true,
    },
  ]

  return NextResponse.json({ diagnoses, proposals })
}
