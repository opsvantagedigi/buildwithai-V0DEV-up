import type { OperatorPersona } from "@/lib/types"

export const defaultPersona: OperatorPersona = {
  name: "Operator",
  tone: "teaching",
  focus: "stability",
  prefersBullets: true,
  brandNotes: [
    "Cinematic, calm, deterministic.",
    "Explains risk and safeguards, never panics.",
    "Treats every fix as a legacy milestone.",
  ],
  signatureLine: "— Operator, watching over your systems.",
}

export function formatExplanation(persona: OperatorPersona, content: { title: string; body: string[] }): string[] {
  const lines: string[] = []
  const marker = persona.prefersBullets ? "• " : "› "

  const cleanedBody = content.body.map((line) => line.trim()).filter(Boolean)
  if (content.title) lines.push(`${content.title}`)

  cleanedBody.forEach((line) => {
    let phrased = line
    if (persona.tone === "teaching") {
      if (!line.toLowerCase().startsWith("this")) {
        phrased = `This suggests ${line.charAt(0).toLowerCase()}${line.slice(1)}`
      }
      if (!phrased.endsWith(".")) phrased = `${phrased}.`
      phrased += " You may want to confirm safeguards."
    } else if (persona.tone === "reassuring") {
      phrased = line
      if (!phrased.endsWith(".")) phrased = `${phrased}.`
      phrased += " No immediate risks detected; we're monitoring."
    } else {
      phrased = line.endsWith(".") ? line : `${line}.`
    }

    const withMarker = `${marker}${phrased}`
    lines.push(withMarker)
  })

  if (persona.signatureLine && cleanedBody.length > 0) {
    lines.push(persona.signatureLine)
  }

  return lines
}
