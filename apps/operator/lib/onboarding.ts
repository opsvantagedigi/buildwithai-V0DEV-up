export function getOnboardingStep(message: string): string | null {
  const m = message.toLowerCase()
  if (m.includes("start") || m.includes("begin")) {
    return "To begin, click 'Start building' on the homepage and choose a template."
  }
  if (m.includes("domain")) {
    return "To connect a domain, open your dashboard → Domains → Add Domain."
  }
  if (m.includes("publish")) {
    return "Publishing is one click: Dashboard → Publish Site."
  }
  return null
}
