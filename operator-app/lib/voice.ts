import type { IncidentSummary, VoiceSummary } from "@/lib/types"

export function buildVoiceSummaryFromIncidents(summary: IncidentSummary): VoiceSummary {
  const bullets: string[] = []
  const recommended: string[] = []

  bullets.push(`Incidents observed: ${summary.totalIncidents}. Fixes: ${summary.fixSuccessCount} succeeded, ${summary.fixFailureCount} failed.`)
  if (summary.rollbackCount) bullets.push(`Rollbacks executed: ${summary.rollbackCount}.`)
  if (summary.highRiskBlockedCount) bullets.push(`High-risk actions blocked: ${summary.highRiskBlockedCount}.`)

  const topPatterns = summary.topPatterns.slice(0, 3)
  if (topPatterns.length) {
    const names = topPatterns.map((p) => `${p.key} (${p.occurrences}x)`).join(", ")
    bullets.push(`Notable recurring patterns: ${names}.`)
  }

  if (summary.approvalsRequiredCount) bullets.push(`Pending approvals: ${summary.approvalsRequiredCount}.`)
  if (summary.emailsFailedCount) bullets.push(`Email delivery issues detected: ${summary.emailsFailedCount}.`)

  if (summary.fixFailureCount || summary.rollbackCount) recommended.push("Review failed fixes and rollback outcomes.")
  if (topPatterns.length) recommended.push(`Focus on patterns: ${topPatterns.map((p) => p.key).join(", ")}.`)
  if (!recommended.length) recommended.push("Continue monitoring; no urgent actions.")

  return {
    title: "Operator status summary",
    bullets,
    recommendedActions: recommended,
    timeframe: "current window",
  }
}
