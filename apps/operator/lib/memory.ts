import type { IncidentRecord } from "@/lib/types"

const memoryStore = new Map<string, string[]>()
const longTermStore: IncidentRecord[] = []
const MAX_LONG_TERM = 5000

export function remember(sessionId: string, message: string) {
  const arr = memoryStore.get(sessionId) ?? []
  arr.push(message)
  memoryStore.set(sessionId, arr)
}

export function recall(sessionId: string): string[] {
  return memoryStore.get(sessionId) ?? []
}

export function compressIncidentHistory(records: IncidentRecord[]): IncidentRecord[] {
  if (!records.length) return []
  const recent = records.slice(-200)
  const older = records.slice(0, Math.max(0, records.length - 200)).filter((_, idx) => idx % 5 === 0)
  return [...older, ...recent]
}

export function storeLongTermMemory(records: IncidentRecord[]) {
  const compressed = compressIncidentHistory(records)
  compressed.forEach((r) => longTermStore.push(r))
  if (longTermStore.length > MAX_LONG_TERM) {
    longTermStore.splice(0, longTermStore.length - MAX_LONG_TERM)
  }
  return compressed.length
}

export function retrieveLongTermMemory(limit = 300): IncidentRecord[] {
  return longTermStore.slice(-limit)
}
