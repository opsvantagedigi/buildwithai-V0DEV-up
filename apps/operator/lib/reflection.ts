import type { IncidentRecord, ReflectionSummary } from "@/lib/types"

function buildHighlights(records: IncidentRecord[]): string[] {
  if (!records.length) return ["No incidents recorded."]
  const failures = records.filter((r) => r.actionType === "fix-failed").length
  const rollbacks = records.filter((r) => r.actionType === "rollback-executed").length
  const successes = records.filter((r) => r.actionType === "fix-applied").length
  return [`Fixes: ${successes} applied`, `Failures: ${failures}`, `Rollbacks: ${rollbacks}`]
}

function buildRecommendations(records: IncidentRecord[]): string[] {
  if (!records.length) return ["Maintain monitoring cadence."]
  const recs: string[] = []
  const failures = records.filter((r) => r.actionType === "fix-failed").length
  if (failures) recs.push("Review failed fixes and mitigate repeat causes.")
  const rollbacks = records.filter((r) => r.actionType === "rollback-executed").length
  if (rollbacks) recs.push("Validate rollback outcomes and guardrails.")
  if (!recs.length) recs.push("Keep safeguards steady and continue audits.")
  return recs
}

function reflectPeriod(records: IncidentRecord[], period: ReflectionSummary["period"]): ReflectionSummary {
  const highlights = buildHighlights(records)
  const risks = records.length ? ["Operational load observed."] : ["None"]
  const recommendations = buildRecommendations(records)
  return { period, highlights, risks, recommendations }
}

export function reflectDaily(records: IncidentRecord[]): ReflectionSummary {
  return reflectPeriod(records.slice(-50), "daily")
}

export function reflectWeekly(records: IncidentRecord[]): ReflectionSummary {
  return reflectPeriod(records.slice(-200), "weekly")
}

export function reflectMonthly(records: IncidentRecord[]): ReflectionSummary {
  return reflectPeriod(records.slice(-400), "monthly")
}

export function reflectBySubsystem(records: IncidentRecord[]): ReflectionSummary {
  const grouped: Record<string, IncidentRecord[]> = {}
  records.forEach((r) => {
    const key = r.source ?? "unknown"
    grouped[key] = grouped[key] ?? []
    grouped[key].push(r)
  })
  const summaries = Object.entries(grouped).map(([subsystem, recs]) => {
    const highlights = buildHighlights(recs)
    const recommendations = buildRecommendations(recs)
    return `${subsystem}: ${highlights.join("; ")}; Recommendations: ${recommendations.join(" ")}`
  })
  return {
    period: "subsystem",
    highlights: summaries,
    risks: [],
    recommendations: [],
  }
}
