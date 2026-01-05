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
