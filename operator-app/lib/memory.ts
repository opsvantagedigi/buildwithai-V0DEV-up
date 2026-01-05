const memoryStore = new Map<string, string[]>()

export function remember(sessionId: string, message: string) {
  const arr = memoryStore.get(sessionId) ?? []
  arr.push(message)
  memoryStore.set(sessionId, arr)
}

export function recall(sessionId: string): string[] {
  return memoryStore.get(sessionId) ?? []
}
