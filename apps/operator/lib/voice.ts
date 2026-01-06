import type { IncidentSummary, VoiceSummary } from "@/lib/types"

export function buildVoiceSummaryFromIncidents(summary: IncidentSummary): VoiceSummary {
  const bullets: string[] = []
  const recommended: string[] = []

  if (summary.totalIncidents === 0) {
    bullets.push("No incidents detected in the current window.")
    bullets.push("No fixes were required — stability remains high.")
    recommended.push("Maintain routine monitoring.")
    return {
      title: "System Status: All Clear",
      bullets,
      recommendedActions: recommended,
      timeframe: "current window",
    }
  }

  const topPatterns = summary.topPatterns.slice(0, 3)
  const hasFailures = summary.fixFailureCount > 0 || summary.rollbackCount > 0

  if (!hasFailures) {
    bullets.push(`Incidents observed: ${summary.totalIncidents}. Fix successes: ${summary.fixSuccessCount}.`)
    bullets.push("No failed fixes or rollbacks in this window.")
    if (topPatterns.length) {
      const names = topPatterns.map((p) => `${p.key} (${p.occurrences}x)`).join(", ")
      bullets.push(`Recurring patterns in view: ${names}.`)
    }
    recommended.push("Review recent fixes to confirm expected outcomes.")
    return {
      title: "System Status: Stable with Activity",
      bullets,
      recommendedActions: recommended,
      timeframe: "current window",
    }
  }

  bullets.push(`Incidents observed: ${summary.totalIncidents}. Failures: ${summary.fixFailureCount}. Rollbacks: ${summary.rollbackCount}.`)
  if (summary.highRiskBlockedCount) bullets.push(`High-risk actions blocked: ${summary.highRiskBlockedCount}.`)
  if (topPatterns.length) {
    const names = topPatterns.map((p) => `${p.key} (${p.occurrences}x)`).join(", ")
    bullets.push(`Patterns influencing outcomes: ${names}.`)
  }
  if (summary.approvalsRequiredCount) bullets.push(`Pending approvals: ${summary.approvalsRequiredCount}.`)
  if (summary.emailsFailedCount) bullets.push(`Email delivery issues detected: ${summary.emailsFailedCount}.`)

  recommended.push("Review recent failures and rollbacks.")
  if (summary.highRiskBlockedCount) recommended.push("Confirm that high-risk actions were correctly blocked.")
  if (topPatterns.length) recommended.push(`Focus remediation on: ${topPatterns.map((p) => p.key).join(", ")}.`)

  return {
    title: "System Status: Attention Recommended",
    bullets,
    recommendedActions: recommended,
    timeframe: "current window",
  }
}
