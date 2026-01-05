import { NextResponse } from "next/server"
import { analyzeEvents, annotateDiagnosesWithHistory, rankDiagnosesByHistory } from "@/lib/diagnostics"
import { proposeFixes, prioritizeFixesByHistory } from "@/lib/fixes"
import { generateRollbackPlan } from "@/lib/rollback"
import { sendEmail } from "@/lib/email"
import { detectAnomalies, recordIncident } from "@/lib/intel"
import { generatePredictiveSuggestions } from "@/lib/predictive"
import type { Diagnosis, MonitoringEvent } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body?.events)
    ? body.events
    : Array.isArray(body)
    ? body
    : []

  const analyzed = analyzeEvents(events)
  analyzed.forEach((diag) => {
    const event = events.find((e) => e.id === diag.eventId)
    recordIncident({
      summary: diag.summary,
      eventId: event?.id,
      diagnosisId: diag.id,
      risk: diag.risk,
      severity: diag.severity,
      source: event?.source,
      kind: event?.kind,
      message: event?.message,
    })
  })

  const annotatedDiagnoses = annotateDiagnosesWithHistory(analyzed)
  const diagnoses = rankDiagnosesByHistory(annotatedDiagnoses)

  const proposals = prioritizeFixesByHistory(proposeFixes(diagnoses))
  const rollbacks = diagnoses.map((d: Diagnosis) => generateRollbackPlan(d.id))
  const predictive = generatePredictiveSuggestions(diagnoses)

  const { anomalies, summary: anomalySummary } = detectAnomalies(events)

  const criticalEvents = events.filter((evt) => evt.severity === "critical")
  if (criticalEvents.length > 0) {
    const summary = criticalEvents.map((evt) => `${evt.id}: ${evt.message}`).join("\n")
    await sendEmail({
      category: "critical-monitoring",
      subject: `Critical events detected (${criticalEvents.length})`,
      text: summary,
    })
  }

  return NextResponse.json({
    diagnoses,
    proposals,
    rollbacks,
    anomalies,
    anomalySummary,
    intel: { anomalies, anomalySummary, predictive },
  })
}
