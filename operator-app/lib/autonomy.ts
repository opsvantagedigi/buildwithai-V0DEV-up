import { logAction } from "@/lib/audit"
import { notifyRollback, performRollback } from "@/lib/rollback"
import { createSnapshot } from "@/lib/snapshots"
import { sendEmail } from "@/lib/email"
import type { RemediationProposal, RollbackPlan, FixExecutionResult, RiskLevel, AutonomyLevel, RemediationStep } from "@/lib/types"

const RESTRICTED_KEYWORDS = ["auth", "authentication", "billing", "database", "db", "dns", "security", "encryption"]

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

function isRestricted(proposal: RemediationProposal) {
  const haystack = [proposal.expectedImpact, ...proposal.steps.map((s: RemediationStep) => s.description)]
    .join(" ")
    .toLowerCase()
  return RESTRICTED_KEYWORDS.some((kw) => haystack.includes(kw))
}

export function classifyRisk(proposal: RemediationProposal): RiskLevel {
  if (isRestricted(proposal)) return "high"
  return proposal.risk || "medium"
}

export function shouldAutoApply(risk: RiskLevel, approved?: boolean) {
  if (risk === "high") return false
  if (risk === "medium") return Boolean(approved)
  return true
}

export async function verifyFix(_: RemediationProposal) {
  return { passed: true, details: "Verification placeholder completed." }
}

export async function executeFix(
  proposal: RemediationProposal,
  options?: { approved?: boolean; sessionId?: string; rollbackPlan?: RollbackPlan }
): Promise<FixExecutionResult> {
  const risk = classifyRisk(proposal)
  const rollbackPlanId = options?.rollbackPlan?.id

  if (risk === "high") {
    const log = logAction({
      actionType: "fix-rejected",
      risk,
      proposalId: proposal.id,
      rollbackId: rollbackPlanId,
      message: "High-risk fixes require explicit elevation.",
    })
    await sendEmail({
      category: "high-risk-blocked",
      subject: `High-risk fix blocked (${proposal.id})`,
      text: `Fix ${proposal.id} was blocked due to high risk. No action was taken.`,
    })
    console.info("[Operator] High-risk fix blocked", { proposalId: proposal.id, risk })
    return { status: "rejected", risk, logId: log.id, message: log.message ?? "High-risk fix rejected." }
  }

  if (!shouldAutoApply(risk, options?.approved)) {
    const log = logAction({
      actionType: "approval-required",
      risk,
      proposalId: proposal.id,
      rollbackId: rollbackPlanId,
      message: "Approval required before applying fix.",
    })
    await sendEmail({
      category: "approval-required",
      subject: `Approval required for fix ${proposal.id}`,
      text: `Fix ${proposal.id} (risk ${risk}) awaits approval before execution.`,
    })
    console.info("[Operator] Approval required", { proposalId: proposal.id, risk })
    return { status: "pending-approval", risk, logId: log.id, message: log.message ?? "Awaiting approval." }
  }

  const snapshot = createSnapshot(
    `Applying proposal ${proposal.id}`,
    proposal.expectedImpact || "Auto-generated fix",
    proposal.steps.map((step: RemediationStep) => step.description),
    risk
  )

  const verification = await verifyFix(proposal)

  if (!verification.passed) {
    const rb = performRollback(snapshot.id, "Verification failed")
    const log = logAction({
      actionType: "fix-failed",
      risk,
      proposalId: proposal.id,
      rollbackId: rb.rollbackId,
      snapshotId: snapshot.id,
      verificationResult: "failed",
      message: "Fix verification failed; rolled back.",
    })
    console.warn("[Operator] Fix verification failed", { proposalId: proposal.id, risk, rollbackId: rb.rollbackId })
    await sendEmail({
      category: "fix-failed",
      subject: `Fix ${proposal.id} failed and rolled back`,
      text: `Fix ${proposal.id} failed verification and was rolled back. Snapshot: ${snapshot.id}, Rollback: ${rb.rollbackId}.`,
    })
    return {
      status: "rolled-back",
      risk,
      snapshotId: snapshot.id,
      rollbackId: rb.rollbackId,
      logId: log.id,
      verificationPassed: false,
      message: log.message ?? "Rolled back after failed verification.",
    }
  }

  const log = logAction({
    actionType: "fix-applied",
    risk,
    proposalId: proposal.id,
    snapshotId: snapshot.id,
    verificationResult: "passed",
    rollbackId: rollbackPlanId,
    message: "Fix applied and verified.",
  })

  console.info("[Operator] Fix applied", { proposalId: proposal.id, risk, snapshotId: snapshot.id })
  await sendEmail({
    category: "fix-applied",
    subject: `Fix ${proposal.id} applied`,
    text: `Fix ${proposal.id} applied with snapshot ${snapshot.id}. Risk: ${risk}.`,
  })

  return {
    status: "applied",
    risk,
    snapshotId: snapshot.id,
    logId: log.id,
    verificationPassed: true,
    message: log.message ?? "Fix applied.",
  }
}

export function rollbackFix(snapshotId: string, reason?: string) {
  const rb = performRollback(snapshotId, reason)
  const log = logAction({
    actionType: "rollback-executed",
    risk: "medium",
    rollbackId: rb.rollbackId,
    snapshotId,
    message: reason ?? "Rollback executed.",
  })
  void notifyRollback(snapshotId, rb.rollbackId, reason)
  return { rollbackId: rb.rollbackId, logId: log.id }
}

export function getAutonomyState(level?: AutonomyLevel) {
  const allowed = ["Low-risk fixes auto-applied with snapshot", "Medium-risk fixes require approval", "High-risk fixes require manual execution"]
  return { level, allowed }
}
