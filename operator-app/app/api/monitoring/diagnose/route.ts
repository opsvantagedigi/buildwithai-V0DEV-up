import { NextResponse } from "next/server"
import { analyzeEvents } from "@/lib/diagnostics"
import { proposeFixes } from "@/lib/fixes"
import { generateRollbackPlan } from "@/lib/rollback"
import { sendEmail } from "@/lib/email"
import type { Diagnosis, MonitoringEvent } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body?.events)
    ? body.events
    : Array.isArray(body)
    ? body
    : []

  const diagnoses = analyzeEvents(events)
  const proposals = proposeFixes(diagnoses)
  const rollbacks = diagnoses.map((d: Diagnosis) => generateRollbackPlan(d.id))

  const criticalEvents = events.filter((evt) => evt.severity === "critical")
  if (criticalEvents.length > 0) {
    const summary = criticalEvents.map((evt) => `${evt.id}: ${evt.message}`).join("\n")
    await sendEmail({
      category: "critical-monitoring",
      subject: `Critical events detected (${criticalEvents.length})`,
      text: summary,
    })
  }

  return NextResponse.json({ diagnoses, proposals, rollbacks })
}
