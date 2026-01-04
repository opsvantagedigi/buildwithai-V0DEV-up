"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Wand2, ArrowRight, Layout, Zap, Globe, Sparkles, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="relative flex min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-linear-to-tr from-[#4f7cff]/35 via-[#2ee6a6]/25 to-[#ffd166]/20 blur-[120px]" />
        <div className="absolute -right-30 -bottom-20 h-64 w-64 rounded-full bg-linear-to-tr from-[#4f7cff]/20 via-[#2ee6a6]/10 to-[#ffd166]/18 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-16 md:px-10">
        <header className="space-y-3 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
            AI WEBSITE STUDIO
          </p>
          <h1 className="font-heading glow-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] bg-clip-text text-3xl md:text-5xl font-semibold text-transparent">
            Describe what you want to build.
          </h1>
          <p className="mx-auto max-w-xl text-sm md:text-base text-muted-foreground">
            One sentence. Your intent becomes infrastructure. The studio turns your brief into cinematic layouts, copy,
            and flows ready to ship.
          </p>
        </header>

        <section className="mt-10 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative group">
            <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-linear-to-r from-[#4f7cff]/25 via-[#2ee6a6]/12 to-[#ffd166]/10 opacity-60 blur transition-opacity duration-500 group-focus-within:opacity-90" />
            <div className="relative glass-panel rounded-[1.75rem] p-6 md:p-8 shadow-2xl transition-all duration-300 group-focus-within:shadow-[0_0_35px_rgba(79,124,255,0.6)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1 text-left">
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.26em] text-emerald-300/90">
                    Ritual Brief
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Describe the site you want to build. We handle structure, copy, and motion.
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Realtime builder online</span>
                  </span>
                </div>
              </div>

              <Textarea
                placeholder="Example: A cinematic marketing site for an AI developer studio called Ritual. Low-light neon aesthetic, focused pricing, social proof, and a clean docs funnel."
                className="mt-4 min-h-35 w-full resize-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted-foreground/70 shadow-[0_18px_45px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7cff]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />

              <div className="mt-4 flex flex-col gap-3 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <span>AI Ready</span>
                  </span>
                  <span className="hidden sm:inline text-muted-foreground/70">
                    Uses your brief to map sections, flows, and CTAs.
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 transition duration-300 hover:bg-white/10"
                  >
                    <span>Open studio</span>
                    <ArrowRight className="size-3" />
                  </Link>
                  <Button type="button" className="rounded-full px-4 py-1.5 text-[11px] font-medium">
                    <Wand2 className="mr-1 size-3" />
                    Generate first pass
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-32 w-full space-y-32">
          {/* 1. Value Proposition Section */}
          <section className="text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Turn your vision into <span className="glow-text text-[#2ee6a6]">production-ready</span> sites.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Stop fighting with drag-and-drop builders. Describe your business, your vibe, and your goals. We handle
              the rest with pixel-perfect precision.
            </p>
          </section>

          {/* 2. 4-Column Feature Grid */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Layout className="size-5 text-[#4f7cff]" />,
                title: "Cinematic Layouts",
                desc: "High-end aesthetic defaults that make every site look premium.",
              },
              {
                icon: <Zap className="size-5 text-[#2ee6a6]" />,
                title: "Instant Deploy",
                desc: "Go from brief to live URL in under 60 seconds with one click.",
              },
              {
                icon: <Globe className="size-5 text-[#ffd166]" />,
                title: "Global CDN",
                desc: "Edge-cached performance ensuring your site is fast worldwide.",
              },
              {
                icon: <Sparkles className="size-5 text-purple-400" />,
                title: "AI Copywriting",
                desc: "Context-aware copy tailored specifically to your target audience.",
              },
            ].map((feature, i) => (
              <div key={i} className="glass-panel group rounded-2xl p-6 transition-all hover:bg-white/5">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-base font-medium text-white">{feature.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </section>

          {/* 3. Horizontal Demo Strip */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-1 md:p-2">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 pointer-events-none z-10" />
            <div className="flex gap-4 p-4 animate-scroll whitespace-nowrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="min-w-[300px] aspect-video rounded-xl bg-slate-900 border border-white/5 overflow-hidden"
                >
                  <img
                    src={`/premium-saas-ui-screenshot-.jpg?key=sh9oh&height=300&width=530&query=premium-saas-ui-screenshot-${i}`}
                    alt={`Demo ${i}`}
                    className="h-full w-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 4. Template Preview Section */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-semibold">Start with a masterclass.</h2>
              <p className="mt-4 text-muted-foreground">
                Select a starting point and let the AI customize every detail.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                { title: "Ritual Dark", category: "Agency" },
                { title: "Nexus Pro", category: "SaaS" },
              ].map((template, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10">
                  <div className="aspect-video w-full bg-slate-900">
                    <img
                      src={`/dark-modern-website-template-.jpg?key=wd25d&height=400&width=700&query=dark-modern-website-template-${i}`}
                      alt={template.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                    <p className="text-[10px] uppercase tracking-widest text-[#2ee6a6]">{template.category}</p>
                    <h3 className="mt-1 font-heading text-xl font-medium text-white">{template.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Pricing Teaser */}
          <section className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-semibold">Ready to ship?</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-6 text-left border border-white/5">
                <h4 className="font-heading text-lg font-medium text-white">Starter</h4>
                <p className="mt-1 text-2xl font-bold text-white">
                  $0<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#2ee6a6]" /> 3 AI Generations/mo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#2ee6a6]" /> Custom Subdomain
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#4f7cff]/10 p-6 text-left border border-[#4f7cff]/20">
                <h4 className="font-heading text-lg font-medium text-white">Pro Studio</h4>
                <p className="mt-1 text-2xl font-bold text-white">
                  $24<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#2ee6a6]" /> Unlimited Generations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#2ee6a6]" /> Custom Domains & SEO
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Trust/Social Proof Section */}
          <section className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Powering the next generation of builders
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-40 grayscale filter lg:gap-16">
              {["Linear", "Vercel", "Stripe", "Supabase", "Anthropic"].map((logo) => (
                <span key={logo} className="font-heading text-lg font-bold text-white tracking-tighter">
                  {logo}
                </span>
              ))}
            </div>
          </section>

          {/* 7. Final CTA Block */}
          <section className="pb-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] p-px">
              <div className="flex flex-col items-center justify-center rounded-[2rem] bg-black/90 px-8 py-16 text-center">
                <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
                  Start building your future today.
                </h2>
                <p className="mt-6 max-w-lg text-muted-foreground">
                  Join 10,000+ creators building premium websites with Ritual AI.
                </p>
                <Button
                  size="lg"
                  className="mt-10 rounded-full px-8 py-6 text-base font-semibold transition-transform hover:scale-105"
                >
                  <Wand2 className="mr-2 size-5" />
                  Get Started for Free
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
