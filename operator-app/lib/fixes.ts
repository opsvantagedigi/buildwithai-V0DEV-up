import { summarizeProposalHistory } from "@/lib/intel"
import type { Diagnosis, RemediationProposal, RiskLevel } from "@/lib/types"

function deriveRisk(diag: Diagnosis): RiskLevel {
  if (diag.risk) return diag.risk
  if (diag.severity === "critical") return "high"
  if (diag.severity === "error") return "medium"
  return "low"
}

export function proposeFixes(diagnoses: Diagnosis[]): RemediationProposal[] {
  return diagnoses.map((diag) => ({
    id: `prop-${diag.id}`,
    diagnosisId: diag.id,
    steps: [
      { description: "Collect logs for deeper inspection" },
      { description: "Check recent deployments for regressions" },
      { description: "Verify API health and retry logic" },
    ],
    risk: deriveRisk(diag),
    expectedImpact: "Improves stability and reduces error frequency",
    requiresApproval: deriveRisk(diag) !== "low",
  }))
}

export function prioritizeFixesByHistory(proposals: RemediationProposal[]): RemediationProposal[] {
  const history = summarizeProposalHistory(proposals)
  const annotated = proposals.map((p) => {
    const h = history[p.id]
    if (!h) return p
    const attempts = h.attempts
    const success = h.successes
    const failure = h.failures
    const rollback = h.rollbacks
    const successRate = attempts ? success / attempts : undefined
    const failureRate = attempts ? (failure + rollback) / attempts : undefined
    const historyNote = rollback > 0 ? "Historically rolled back" : successRate && successRate >= 0.6 ? "Reliable" : undefined
    return {
      ...p,
      timesApplied: attempts || undefined,
      historicalSuccessRate: successRate,
      historicalFailureRate: failureRate,
      timesRolledBack: rollback || undefined,
      historyNote,
    }
  })

  return annotated.sort((a, b) => {
    const aScore = (a.historicalSuccessRate ?? 0) - (a.historicalFailureRate ?? 0)
    const bScore = (b.historicalSuccessRate ?? 0) - (b.historicalFailureRate ?? 0)
    if (aScore === bScore) return (b.timesApplied ?? 0) - (a.timesApplied ?? 0)
    return bScore - aScore
  })
}
