export async function retrieveContext(query: string): Promise<string[]> {
  // Placeholder: return mock context
  // Later: replace with vector search over docs, pages, metadata
  if (query.toLowerCase().includes("pricing")) {
    return ["Pricing: Launch $29/mo, Scale $99/mo, Enterprise custom."]
  }
  if (query.toLowerCase().includes("builder")) {
    return ["The Builder generates cinematic pages using your brand cues."]
  }
  return []
}
