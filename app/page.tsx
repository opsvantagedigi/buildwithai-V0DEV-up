"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");

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
            One sentence. Your intent becomes infrastructure. The studio turns your brief into
            cinematic layouts, copy, and flows ready to ship.
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
                  <Button
                    type="button"
                    className="rounded-full px-4 py-1.5 text-[11px] font-medium"
                  >
                    <Wand2 className="mr-1 size-3" />
                    Generate first pass
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
