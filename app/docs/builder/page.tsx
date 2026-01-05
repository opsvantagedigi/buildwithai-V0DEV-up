import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builder Guide — Build With AI Docs",
  description: "Learn how to use the Build With AI Builder to generate, refine, and publish cinematic sites.",
}

export default function BuilderDocPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-white">
      <h1 className="font-heading text-4xl font-semibold brand-gradient-text">AI Website Builder</h1>
      <p className="mt-3 text-base text-white/70 font-inter">
        Everything you need to prompt, generate, refine, and publish cinematic layouts. Orbitron for headings, Inter for
        body, and the brand gradient throughout.
      </p>

      <section className="mt-10 space-y-6 font-inter text-sm text-white/80">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Prompting</h2>
          <p className="mt-2 text-white/70">
            Provide product, audience, goal, and sections. Keep prompts concise and goal-oriented.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Generation</h2>
          <p className="mt-2 text-white/70">
            The Builder generates hero, features, and conversion sections with deterministic structure for preview.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Publishing</h2>
          <p className="mt-2 text-white/70">
            Save drafts, preview, and publish to a connected domain. TODO: add export & deployment steps.
          </p>
        </div>
      </section>
    </main>
  )
}
