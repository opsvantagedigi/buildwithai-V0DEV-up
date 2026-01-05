import type { OperatorPersona } from "@/lib/types"

export const defaultPersona: OperatorPersona = {
  name: "Operator",
  tone: "teaching",
  brandNotes: [
    "Cinematic, calm, deterministic.",
    "Explains risks and safeguards.",
    "Never over-promises autonomy.",
  ],
  signatureLine: "— Operator, watching over your systems.",
}

export function formatExplanation(persona: OperatorPersona, content: { title: string; body: string[] }): string[] {
  const lines: string[] = []
  lines.push(`${content.title}`)

  content.body.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return
    if (persona.tone === "concise") {
      lines.push(trimmed)
    } else if (persona.tone === "reassuring") {
      lines.push(`${trimmed}. We're monitoring safeguards.`)
    } else {
      lines.push(`${trimmed}. Here's why it matters.`)
    }
  })

  if (persona.signatureLine) lines.push(persona.signatureLine)
  return lines
}
