import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Features — Build With AI",
  description:
    "Everything you need to build a world-class website, from AI layout and cinematic components to analytics, SEO, and content intelligence.",
}

const FEATURES = [
  {
    title: "AI Layout Engine",
    bullets: [
      "Generate full-page layouts from a single natural language prompt.",
      "Autotunes sections for hero, storytelling, features, and conversion.",
      "Understands your audience, funnel stage, and brand tone.",
    ],
  },
  {
    title: "Cinematic Component Library",
    bullets: [
      "Hybrid cinematic blocks crafted for narrative, motion, and clarity.",
      "Responsive by default, from mobile to large cinematic displays.",
      "Composable sections designed for founders, agencies, and creators.",
    ],
  },
  {
    title: "Multi-Site Dashboard",
    bullets: [
      "Manage brands, funnels, and experiments from a single workspace.",
      "Switch between sites, templates, and experiments in one click.",
      "Invite collaborators and keep history across every iteration.",
    ],
  },
  {
    title: "Domain Intelligence",
    bullets: [
      "Suggests domain ideas based on your product and audience.",
      "Checks availability and extensions in real time.",
      "Connects domains to sites with guided DNS flows.",
    ],
  },
  {
    title: "Analytics Foundation",
    bullets: [
      "See visits, engagement, and conversions at a glance.",
      "Understand which sections and CTAs drive results.",
      "Export events into the tools your team already uses.",
    ],
  },
  {
    title: "SEO Engine",
    bullets: [
      "Generates structured metadata, titles, and descriptions per page.",
      "Optimizes headings and copy for clarity and search intent.",
      "Keeps your sitemap and canonical links in sync automatically.",
    ],
  },
  {
    title: "AI Content Writer",
    bullets: [
      "Drafts headlines, subcopy, and microcopy in your brand voice.",
      "Adapts messaging for different audiences and campaigns.",
      "Keeps content consistent across marketing, docs, and product.",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">FEATURES</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            Everything you need to build a world-class website.
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
            From AI layout to analytics, every feature is tuned for speed, clarity, and control. Build cinematic
            experiences that ship fast — and scale with you.
          </p>
          <div className="mt-6">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold font-inter text-slate-950 hover:bg-slate-100"
            >
              Start Building
              <ArrowRight className="ml-2 size-3.5" />
            </Link>
          </div>
        </section>

        {/* Features grid */}
        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="glass-panel flex flex-col rounded-2xl p-6 font-inter text-sm">
              <h2 className="font-heading text-lg font-semibold text-white">{feature.title}</h2>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href="/builder"
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 hover:text-emerald-200"
                >
                  Build with this
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
