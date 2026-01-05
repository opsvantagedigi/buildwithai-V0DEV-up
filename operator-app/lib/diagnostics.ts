import type { MonitoringEvent, Diagnosis, RiskLevel } from "@/lib/types"

function mapSeverityToRisk(severity?: MonitoringEvent["severity"]): RiskLevel {
  if (severity === "critical") return "high"
  if (severity === "error") return "medium"
  return "low"
}

export function analyzeEvents(events: MonitoringEvent[]): Diagnosis[] {
  return events.map((event) => ({
    id: `diag-${event.id}`,
    eventId: event.id,
    summary: `Detected ${event.kind} issue from ${event.source}: ${event.message}`,
    evidence: [event.message],
    suspectedCauses: [
      event.kind === "error"
        ? "Unhandled exception or API failure"
        : event.kind === "latency"
        ? "Slow API or heavy computation"
        : event.kind === "uptime"
        ? "Service outage or deployment issue"
        : "General anomaly",
    ],
    confidence: 0.7,
    severity: event.severity,
    risk: mapSeverityToRisk(event.severity),
  }))
}
