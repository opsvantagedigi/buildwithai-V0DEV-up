import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"

export const metadata: Metadata = {
  title: "Build With AI — Create Without Limits",
  description:
    "Build With AI is a cinematic AI Website Builder that transforms your ideas into production-ready websites in seconds.",
}

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-24 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
              CINEMATIC AI WEBSITE BUILDER
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
              Build With AI. Create Without Limits.
            </h1>
            <p className="max-w-xl text-sm md:text-base text-muted-foreground font-inter">
              A cinematic AI Website Builder for founders, creators, and teams who care about story, speed, and
              control.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-inter">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Realtime layout generation
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-black/40 px-3 py-1 font-inter">
                <Sparkles className="size-3 text-amber-300" />
                Hybrid cinematic style
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/builder">
                <Button
                  size="lg"
                  className="rounded-full px-7 py-5 text-sm font-semibold font-inter bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-black shadow-[0_0_35px_rgba(79,124,255,0.75)] hover:opacity-90"
                >
                  Start Building
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-inter text-white/90 hover:bg-white/10"
              >
                Explore Features
              </Link>
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-inter">
              No templates. No drag-and-drop. Just your story, rendered.
            </p>
          </div>

          {/* Imagery description as cinematic preview */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-linear-to-tr from-[#4f7cff]/35 via-[#22c55e]/20 to-[#facc15]/15 opacity-70 blur-xl" />
            <div className="relative glass-panel flex flex-col justify-between rounded-3xl p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-heading tracking-[0.28em] uppercase text-white/80">Live Preview</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-300">AI Generating</span>
              </div>
              <div className="space-y-3 rounded-2xl bg-black/60 p-4">
                <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-xs font-inter text-muted-foreground">
                  “A futuristic interface showing a website morphing in real time as a prompt is typed. Soft neon
                  edges, floating UI blocks, subtle parallax.”
                </div>
                <div className="grid gap-2 text-[11px] text-muted-foreground/90 md:grid-cols-2">
                  <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="font-heading text-xs text-white">Prompt</p>
                    <p className="font-inter">“Launch site for an AI studio with pricing, docs, and blog.”</p>
                  </div>
                  <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="font-heading text-xs text-white">Layout</p>
                    <p className="font-inter">Hero, narrative strip, feature grid, pricing, and docs funnel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Build With AI */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">
              Your vision. Our intelligence.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
              Build With AI understands your product, audience, and aesthetic, then turns that intent into cinematic
              layouts, narrative structure, and production-ready code.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["AI Layout Engine", "Cinematic Components", "Multi-Site Dashboard", "Zero Lock-In"].map(
              (title, index) => {
                const descriptions = [
                  "Full-page structures generated from natural language prompts.",
                  "Beautiful, responsive blocks crafted for storytelling.",
                  "Manage brands, funnels, and experiments from a single workspace.",
                  "Export your code, or deploy instantly — the choice is yours.",
                ]

                return (
                  <article
                    key={title}
                    className="glass-panel flex flex-col justify-between rounded-2xl p-5 text-sm text-muted-foreground font-inter"
                  >
                    <div>
                      <p className="font-heading text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">
                        Pillar 0{index + 1}
                      </p>
                      <h3 className="mt-2 text-base font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-xs leading-relaxed">{descriptions[index]}</p>
                    </div>
                  </article>
                )
              },
            )}
          </div>

          <div className="text-center">
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-inter uppercase tracking-[0.22em] text-white/90 hover:bg-white/10"
            >
              See Everything It Can Do
              <ArrowRight className="ml-2 size-3" />
            </Link>
          </div>
        </section>

        {/* Live Preview */}
        <section className="grid items-center gap-8 rounded-3xl border border-white/10 bg-black/40 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:p-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">See your ideas come alive.</h2>
            <p className="mt-3 max-w-lg text-sm md:text-base text-muted-foreground font-inter">
              Type a few words. Watch the layout respond. Every keystroke updates the composition, typography, and story
              so you can feel your site before it exists.
            </p>
            <Link
              href="/builder"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold font-inter text-slate-950 hover:bg-slate-100"
            >
              Try the Builder
              <ArrowRight className="ml-1.5 size-3.5" />
            </Link>
          </div>

          <div className="space-y-3 text-xs font-inter text-muted-foreground">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Prompt → Layout</p>
              <p className="mt-2 text-white/90">“Landing page for a pre-launch AI wearable.”</p>
              <p className="mt-2 text-muted-foreground">
                Builder responds with hero, story rail, feature grid, pricing tiers, FAQ, and early-access form.
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/80">
              <span>Latency: 1.4s • Regions: Global Edge</span>
              <span>Powered by Hybrid Cinematic Engine</span>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">Who it’s for</h2>
            <p className="mt-4 mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
              Build With AI is designed for people who need cinematic quality and startup speed — without sacrificing
              control over the details.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="glass-panel flex flex-col rounded-2xl p-5 font-inter">
              <h3 className="font-heading text-base font-semibold text-white">Founders</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>Ship investor-ready landing pages in a single session.</li>
                <li>Test new narratives, pricing, and funnels without dev cycles.</li>
                <li>Keep full ownership of your code and data.</li>
              </ul>
            </article>

            <article className="glass-panel flex flex-col rounded-2xl p-5 font-inter">
              <h3 className="font-heading text-base font-semibold text-white">Agencies</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>Turn creative briefs into pitch-ready prototypes in minutes.</li>
                <li>Manage dozens of brands and experiments in one dashboard.</li>
                <li>Export clean code to your existing stacks and workflows.</li>
              </ul>
            </article>

            <article className="glass-panel flex flex-col rounded-2xl p-5 font-inter">
              <h3 className="font-heading text-base font-semibold text-white">Creators</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>Launch cinematic personal sites, portfolios, and drops.</li>
                <li>Use AI to draft copy, sections, and flows — then edit by hand.</li>
                <li>Stay on-brand across multiple sites, launches, and collabs.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Legacy */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-black/60 p-7 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <h2 className="font-heading text-3xl font-semibold text-white">Built on wisdom. Powered by AI.</h2>
              <p className="text-sm md:text-base text-muted-foreground font-inter">
                A platform inspired by legacy, family, and the belief that every creator deserves a voice. Build With AI
                is where human stories meet cinematic technology.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="text-xs text-muted-foreground font-inter max-w-xs">
                From early drafts and family projects to venture-backed launches, your work lives in one place — and it
                always feels like you.
              </p>
              <Link href="/builder">
                <Button className="rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] px-6 py-2 text-xs font-semibold font-inter text-black shadow-[0_0_28px_rgba(79,124,255,0.7)] hover:opacity-90">
                  Build Your Legacy Site
                  <ArrowRight className="ml-2 size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
