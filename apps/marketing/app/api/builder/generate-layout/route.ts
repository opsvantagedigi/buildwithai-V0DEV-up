import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const prompt: string = body.prompt || "Untitled project"
  const primaryGoal: string = body.primaryGoal || "launch"
  const pageType: string = body.pageType || "landing"

  const baseSections = [
    {
      id: "hero",
      type: "hero",
      headline: `${prompt} — cinematic hero`,
      subheadline: `Purpose: ${primaryGoal}. Page: ${pageType}. Crafted for immediate clarity and conversion.`,
      cta: "Start now",
    },
    {
      id: "features",
      type: "features",
      items: [
        "Story rail with visual + copy",
        "Grid of differentiators",
        "Trust badges and social proof",
      ],
    },
    {
      id: "conversion",
      type: "cta",
      headline: "Launch in minutes",
      ctaPrimary: "Publish",
      ctaSecondary: "Preview",
    },
  ]

  return NextResponse.json({
    sections: baseSections,
    meta: {
      prompt,
      primaryGoal,
      pageType,
      deterministic: true,
    },
  })
}

// TODO: Replace stubbed deterministic layout with real AI layout generation.
