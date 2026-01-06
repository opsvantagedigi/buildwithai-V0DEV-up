import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"

export const metadata: Metadata = {
  title: "AI Website Builder — Build With AI",
  description: "Your website, generated in seconds. Describe your vision and watch AI build it with cinematic layouts and production-ready code.",
}

export default function BuilderPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
              AI WEBSITE BUILDER
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
              Your Website, Generated in Seconds.
            </h1>
            <p className="max-w-xl text-sm md:text-base text-muted-foreground font-inter">
              Describe your vision. Watch AI build it. From layout to copy to structure, the Builder assembles everything
              into cinematic, production-ready pages.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-7 py-5 text-sm font-semibold font-inter bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-black shadow-[0_0_35px_rgba(79,124,255,0.75)] hover:opacity-90"
              >
                Start with a Prompt
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-inter text-white/90 hover:bg-white/10"
              >
                See Example Sites
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-linear-to-tr from-[#4f7cff]/35 via-[#22c55e]/20 to-[#facc15]/15 opacity-70 blur-xl" />
            <div className="relative glass-panel flex flex-col rounded-3xl p-5 shadow-2xl text-xs font-inter text-muted-foreground">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Builder Workspace</p>
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/60 p-3">
                <p className="text-[10px] text-muted-foreground">Prompt</p>
                <p className="mt-1 text-white/90">“Launch page for a cinematic AI photo studio.”</p>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Left</p>
                  <p className="mt-1 text-xs text-white/90">Prompt box with brand, goals, and constraints.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Right</p>
                  <p className="mt-1 text-xs text-white/90">Live layout preview morphing in real time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">How it works</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="glass-panel rounded-2xl p-5 font-inter text-sm text-muted-foreground">
              <p className="font-heading text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">Step 01</p>
              <h3 className="mt-2 text-base font-semibold text-white">Describe your site</h3>
              <p className="mt-2 text-xs leading-relaxed">
                Share your product, audience, and aesthetic in everyday language. The Builder parses your intent into
                pages, sections, and flows.
              </p>
            </article>
            <article className="glass-panel rounded-2xl p-5 font-inter text-sm text-muted-foreground">
              <p className="font-heading text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">Step 02</p>
              <h3 className="mt-2 text-base font-semibold text-white">Review your layout</h3>
              <p className="mt-2 text-xs leading-relaxed">
                Instantly preview a cinematic layout with on-brand copy, CTAs, and structure tuned to your goals.
              </p>
            </article>
            <article className="glass-panel rounded-2xl p-5 font-inter text-sm text-muted-foreground">
              <p className="font-heading text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">Step 03</p>
              <h3 className="mt-2 text-base font-semibold text-white">Refine and publish</h3>
              <p className="mt-2 text-xs leading-relaxed">
                Adjust copy, components, and flows. When it feels right, publish or export clean code to your stack.
              </p>
            </article>
          </div>
          <div className="text-center">
            <Link
              href="/builder/live"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold font-inter text-slate-950 hover:bg-slate-100"
            >
              Open the Builder
              <ArrowRight className="ml-2 size-3.5" />
            </Link>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-10 space-y-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">Capabilities</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Page Layouts",
              "Cinematic Components",
              "Design System Aware",
              "Production-Ready Export",
            ].map((capability) => (
              <article
                key={capability}
                className="glass-panel flex flex-col rounded-2xl p-5 text-xs font-inter text-muted-foreground"
              >
                <h3 className="text-sm font-semibold text-white">{capability}</h3>
                <p className="mt-2 leading-relaxed">
                  {capability === "Page Layouts" &&
                    "Multi-section pages generated from a single prompt, complete with navigation, hero, and funnels."}
                  {capability === "Cinematic Components" &&
                    "Hybrid cinematic blocks optimized for storytelling, motion, and clarity across devices."}
                  {capability === "Design System Aware" &&
                    "Respects your brand tokens, typography, and spacing so everything feels cohesive."}
                  {capability === "Production-Ready Export" &&
                    "Export Next.js-ready structures or deploy instantly with zero lock-in."}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/ai-tools"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-inter uppercase tracking-[0.22em] text-white/90 hover:bg-white/10"
            >
              See the AI Tools
              <ArrowRight className="ml-2 size-3" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
