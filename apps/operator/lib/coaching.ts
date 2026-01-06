import type { IncidentPattern, IncidentSummary, OperatorPersona, VoiceSummary } from "@/lib/types"

function describePatterns(patterns: IncidentPattern[]): string[] {
  if (!patterns.length) return []
  const sorted = [...patterns].sort((a, b) => b.occurrences - a.occurrences).slice(0, 2)
  return sorted.map((p) => `${p.key} (${p.occurrences}x)`)
}

function summarizeFixOutcomes(summary?: IncidentSummary): string | undefined {
  if (!summary) return undefined
  return `Fix outcomes: ${summary.fixSuccessCount} succeeded, ${summary.fixFailureCount} failed, ${summary.rollbackCount} rollbacks.`
}

export function buildCoachingBody(params: {
  persona: OperatorPersona
  summary?: IncidentSummary
  patterns: IncidentPattern[]
  voiceSummary?: VoiceSummary
}): string[] {
  const { summary, patterns } = params
  const body: string[] = []

  if (!summary || summary.totalIncidents === 0) {
    body.push("No recurring patterns detected — the system is stable.")
    body.push("Keep guardrails steady and continue calm monitoring.")
    return body
  }

  const patternLines = describePatterns(patterns)
  if (patternLines.length) {
    body.push(`Top signals: ${patternLines.join(", ")}.`)
  } else {
    body.push("No recurring patterns detected — no hotspots at this time.")
  }

  const fixLine = summarizeFixOutcomes(summary)
  if (fixLine) body.push(fixLine)

  if (summary.highRiskBlockedCount > 0) {
    body.push(`High-risk blocks: ${summary.highRiskBlockedCount} enforced.`)
  }

  if (summary.totalIncidents >= 10 && summary.fixFailureCount === 0 && summary.rollbackCount === 0) {
    body.push("Trend: incident volume holding steady with clean recoveries.")
  }

  // Limit to 4 insights to keep it focused
  return body.slice(0, 4)
}
