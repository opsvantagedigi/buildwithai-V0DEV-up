import { getSnapshot, restoreSnapshot } from "@/lib/snapshots"
import type { RollbackPlan } from "@/lib/types"
import { sendEmail } from "@/lib/email"

export function generateRollbackPlan(diagnosisId: string): RollbackPlan {
  return {
    id: `rollback-${diagnosisId}`,
    steps: [
      "Revert to last known good deployment",
      "Invalidate CDN cache",
      "Verify service health",
      "Re-run smoke tests",
    ],
    verificationCriteria: ["Errors cleared", "Latency normalized", "Smoke tests passing"],
    expectedState: "System restored to last known good",
  }
}

export function performRollback(snapshotId: string, reason?: string) {
  const snapshot = getSnapshot(snapshotId)
  const restored = snapshot ? restoreSnapshot(snapshotId) : null
  return {
    rollbackId: `rollback-${snapshotId}`,
    restored,
    reason: reason ?? "autonomy-rollback",
  }
}

export async function notifyRollback(snapshotId: string, rollbackId: string, reason?: string) {
  await sendEmail({
    category: "rollback-executed",
    subject: `Rollback executed for snapshot ${snapshotId}`,
    text: `Rollback ${rollbackId} executed for snapshot ${snapshotId}. Reason: ${reason ?? "autonomy rollback"}.`,
  })
}
