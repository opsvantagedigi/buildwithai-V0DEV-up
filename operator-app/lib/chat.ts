import { getOnboardingStep } from "@/lib/onboarding"
import { recall, remember } from "@/lib/memory"
import { retrieveContext } from "@/lib/rag"

export async function getChatResponse(sessionId: string, message: string): Promise<string> {
  remember(sessionId, `user: ${message}`)

  const onboarding = getOnboardingStep(message)
  if (onboarding) {
    remember(sessionId, `operator: ${onboarding}`)
    return onboarding
  }

  const context = await retrieveContext(message)
  const history = recall(sessionId)
  const recent = history.slice(-3).join(" | ")
  const contextLine = context.length > 0 ? context.join(" ") : "I will keep learning more about your site."

  const reply = `Based on what I know: ${contextLine}. You asked: "${message}". Recent context: ${recent}`

  remember(sessionId, `operator: ${reply}`)

  return reply
}
