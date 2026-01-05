import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Tools — Build With AI",
  description:
    "AI tools that think like a designer and a founder. Use them standalone or inside the Builder to generate layouts, copy, SEO, components, and more.",
}

const TOOLS = [
  {
    title: "Layout Generator",
    href: "/ai-tools/layout",
    description: "Turn a short prompt into full-page layouts with cinematic sections, flows, and CTAs.",
  },
  {
    title: "Copywriter",
    href: "/ai-tools/copywriter",
    description: "Draft headlines, subcopy, and microcopy in a consistent, on-brand voice.",
  },
  {
    title: "SEO Assistant",
    href: "/ai-tools/seo",
    description: "Generate titles, meta descriptions, and structured data tuned for search intent.",
  },
  {
    title: "Component Generator",
    href: "/ai-tools/components",
    description: "Design and assemble reusable cinematic components from natural language prompts.",
  },
  {
    title: "Color Palette Generator",
    href: "/ai-tools/colors",
    description: "Create palettes from brand adjectives, references, or existing assets.",
  },
  {
    title: "Domain Name Generator",
    href: "/ai-tools/domains",
    description: "Explore name ideas and domain options grounded in your product and audience.",
  },
  {
    title: "Sitemap Builder",
    href: "/ai-tools/sitemap",
    description: "Map site architecture from your goals, funnels, and content strategy.",
  },
]

export default function AiToolsPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">AI TOOLS</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            AI tools that think like a designer and a founder.
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
            Use them standalone or inside the Builder. Every tool understands layout, story, and conversion — not just
            words on a page.
          </p>
        </section>

        {/* Tools grid */}
        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <article key={tool.href} className="glass-panel flex flex-col justify-between rounded-2xl p-6 font-inter">
              <div>
                <h2 className="font-heading text-lg font-semibold text-white">{tool.title}</h2>
                <p className="mt-2 text-xs text-muted-foreground">{tool.description}</p>
              </div>
              <div className="mt-4">
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 hover:text-emerald-200"
                >
                  Open tool
                  <ArrowRight className="ml-2 size-3" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
