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
  const context = (event?.context as { sessionId?: string; mode?: string } | undefined) ?? {}

  const diagnoses: Diagnosis[] = event
    ? [
        {
          id: `diag-${event.id ?? "unknown"}`,
          eventId: event.id ?? "unknown",
          summary: `Observed widget activity from source "${event.source ?? "unknown"}"${
            context.mode ? ` in mode "${context.mode}"` : ""
          }${context.sessionId ? ` (session ${context.sessionId})` : ""}.`,
          evidence: [event.message],
          suspectedCauses: ["Normal Operator widget usage"],
          confidence: 0.7,
        },
      ]
    : [
        {
          id: "diag-unknown",
          eventId: "unknown",
          summary: "Observed widget activity.",
          evidence: [],
          suspectedCauses: ["Normal Operator widget usage"],
          confidence: 0.6,
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
