export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return ""
  const key = "bwai-operator-session"
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}
