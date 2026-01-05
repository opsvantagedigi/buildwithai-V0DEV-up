import type { RiskLevel, Snapshot } from "@/lib/types"

const snapshotStore = new Map<string, Snapshot>()

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function createSnapshot(reason: string, diffSummary: string, affectedFiles: string[], riskLevel: RiskLevel): Snapshot {
  const snapshot: Snapshot = {
    id: makeId("snap"),
    timestamp: new Date().toISOString(),
    reason,
    diffSummary,
    affectedFiles,
    riskLevel,
  }
  snapshotStore.set(snapshot.id, snapshot)
  return snapshot
}

export function getSnapshot(id: string): Snapshot | undefined {
  return snapshotStore.get(id)
}

export function listSnapshots(): Snapshot[] {
  return Array.from(snapshotStore.values()).sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
}

export function restoreSnapshot(id: string): Snapshot | null {
  const snapshot = snapshotStore.get(id)
  return snapshot ?? null
}
