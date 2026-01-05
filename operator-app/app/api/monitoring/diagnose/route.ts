import { NextResponse } from "next/server"
import type { Diagnosis, MonitoringEvent, RemediationProposal } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body)
    ? body
    : body && Array.isArray(body.events)
    ? body.events
    : []

  const event = events[0]

  const diagnoses: Diagnosis[] = [
    {
      id: `diag-${event?.id ?? "unknown"}`,
      eventId: event?.id ?? "unknown",
      summary: event
        ? `Observed activity from "${event.source}" with message: "${event.message}".`
        : "Observed generic widget activity.",
      evidence: event ? [event.message] : [],
      suspectedCauses: ["Normal Operator widget engagement"],
      confidence: 0.7,
    },
  ]

  const proposals: RemediationProposal[] = [
    {
      id: "prop-1",
      diagnosisId: diagnoses[0].id,
      steps: [],
      risk: "low",
      expectedImpact: "Improve observability of widget engagement and session behavior.",
      requiresApproval: true,
    },
  ]

  return NextResponse.json({ diagnoses, proposals })
}
