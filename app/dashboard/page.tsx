import Sidebar from "./sidebar";
import AiTimeline from "./ai-timeline";

export default function DashboardPage() {
  return (
    <div className="relative flex min-h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-64 shrink-0 h-screen p-4 hidden md:block">
        <Sidebar />
      </aside>

      <main className="relative flex-1 px-6 py-10 md:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-linear-to-tr from-[#4f7cff]/35 via-[#2ee6a6]/25 to-[#ffd166]/20 blur-[120px]" />
          <div className="absolute -right-30 -bottom-20 h-64 w-64 rounded-full bg-linear-to-tr from-[#4f7cff]/20 via-[#2ee6a6]/10 to-[#ffd166]/18 blur-[120px]" />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          <header className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
              AI WEBSITE STUDIO
            </p>
            <h1 className="font-heading glow-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] bg-clip-text text-3xl md:text-4xl font-semibold text-transparent">
              Tell the ritual what to build.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Describe the product, mood, and constraints. The studio turns that
              brief into structure, copy, and cinematic layouts that are ready
              to ship.
            </p>
          </header>

          <section className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-linear-to-r from-[#4f7cff]/25 via-[#2ee6a6]/12 to-[#ffd166]/10 opacity-60 blur transition-opacity duration-500" />
            <div className="relative glass-panel rounded-[1.75rem] p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-emerald-300/90">
                    Ritual Brief
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Be specific. We map this into sections, flows, CTAs, and
                    copy that matches your intent.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Realtime builder online</span>
                  </span>
                </div>
              </div>

              <textarea
                className="mt-4 min-h-35 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted-foreground/70 shadow-[0_18px_45px_rgba(0,0,0,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-[#4f7cff]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                placeholder="Example: Build a cinematic marketing site for an AI developer studio called Ritual. Low-light neon aesthetic, focused pricing, social proof, and a clean docs funnel."
              />

              <div className="mt-4 flex flex-col gap-3 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <span>AI Ready</span>
                  </span>
                  <span className="hidden sm:inline text-muted-foreground/70">
                    Uses your brief to design structure, copy, and motion.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 transition duration-300 hover:bg-white/10">
                    <span className="size-1 rounded-full bg-emerald-400" />
                    <span>Preview pass</span>
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-transparent bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-4 py-1.5 text-[11px] font-medium text-black shadow-[0_0_22px_rgba(79,124,255,0.55)] transition duration-300 hover:shadow-[0_0_30px_rgba(79,124,255,0.8)]">
                    <span>Build with AI</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-[10px] tracking-[0.32em] text-muted-foreground uppercase">
                    Ritual Engine
                  </p>
                  <h2 className="font-heading text-sm font-medium text-white/90">AI Build Timeline</h2>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  v1.0.4 • London Node
                </span>
              </div>
              <AiTimeline />
            </div>

            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-4 text-xs text-muted-foreground/90">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Compile Targets
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/80">
                    Next.js • Vercel Edge
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Hero, feature grid, pricing, and FAQ layout</li>
                  <li>Domain-aware copy, headings, and microcopy</li>
                  <li>CTA variants for acquisition and activation</li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Session: Ritual Studio • 2024.10 build window</span>
                <span className="text-muted-foreground/70">Autosaves to workspace</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
