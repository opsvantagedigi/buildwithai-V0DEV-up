import type { Metadata } from "next"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"

export const metadata: Metadata = {
  title: "Builder Live Workspace — Build With AI",
  description: "Minimal live workspace for generating, previewing, and publishing AI-built websites in real time.",
}

export default function BuilderLivePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      {/* Minimal app shell */}
      <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-3 text-xs font-inter">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-tr from-[#4f7cff] via-[#22c55e] to-[#facc15]" />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/70">Project</p>
            <p className="text-[11px] text-white/90">Untitled cinematic site</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-inter text-white/80">
            Save
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-white/20 px-3 text-[11px] font-inter text-white/90">
            Preview
          </Button>
          <Button
            size="sm"
            className="h-8 rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] px-4 text-[11px] font-semibold font-inter text-black shadow-[0_0_22px_rgba(79,124,255,0.7)]"
          >
            Publish
          </Button>
        </div>
      </header>

      {/* Workspace layout */}
      <main className="flex flex-1 flex-col gap-4 px-4 py-4 md:flex-row md:px-6 md:py-6">
        {/* Left: Prompt box */}
        <section className="flex w-full flex-col gap-3 md:w-[30%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Prompt</h2>
          <div className="glass-panel flex-1 rounded-2xl p-4">
            <Textarea
              placeholder="Describe your site, brand, and goals."
              className="min-h-[220px] w-full border border-white/10 bg-black/50 text-xs text-white placeholder:text-muted-foreground/70"
            />
            <p className="mt-2 text-[10px] text-muted-foreground font-inter">
              Include your audience, offer, sections you need, and any visual references.
            </p>
            <Button
              size="sm"
              className="mt-3 h-8 w-full rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-[11px] font-semibold font-inter text-black"
            >
              Save Draft
            </Button>
          </div>
        </section>

        {/* Center: Canvas */}
        <section className="flex w-full flex-col gap-3 md:w-[45%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Canvas</h2>
          <div className="glass-panel flex-1 rounded-2xl border-dashed border-white/15 bg-black/60 p-4 text-xs font-inter text-muted-foreground">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Live layout preview</p>
            <p className="mt-2 text-white/90">
              This canvas will render your AI-generated hero, sections, CTAs, and footer as soon as you generate.
            </p>
            <ul className="mt-3 list-disc pl-4">
              <li>Hero with headline, subheadline, and primary CTA.</li>
              <li>Feature grid tuned to your product and audience.</li>
              <li>Pricing or conversion section, depending on your goal.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
              <span className="rounded-full bg-white/5 px-3 py-1">Preview</span>
              <span className="rounded-full bg-white/5 px-3 py-1">Desktop</span>
              <span className="rounded-full bg-white/5 px-3 py-1">Mobile</span>
            </div>
          </div>
          <div className="flex gap-2 text-[11px] font-inter text-muted-foreground">
            <Button variant="outline" size="sm" className="h-8 flex-1 border-white/20 text-white/80">
              Preview
            </Button>
            <Button
              size="sm"
              className="h-8 flex-1 rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-[11px] font-semibold text-black"
            >
              Publish to Domain
            </Button>
          </div>
        </section>

        {/* Right: Properties */}
        <section className="flex w-full flex-col gap-3 md:w-[25%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Properties</h2>
          <div className="glass-panel flex-1 space-y-3 rounded-2xl p-4 text-xs font-inter text-muted-foreground">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Theme</p>
              <div className="mt-2 flex gap-2 text-[11px]">
                <button className="flex-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-white/90">
                  Hybrid Cinematic
                </button>
                <button className="flex-1 rounded-lg border border-white/10 bg-black/40 px-2 py-1">Minimal</button>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Structure</p>
              <ul className="mt-2 space-y-1">
                <li>Hero • Story rail</li>
                <li>Feature grid • Social proof</li>
                <li>Pricing • FAQ • Footer</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</p>
              <p className="mt-1 text-[11px] text-emerald-300">Autosaving draft…</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
