import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"
import { agentMedia } from "@/config/agentMedia"

type AgentShowcaseSectionType = Extract<Section, { type: "agentShowcase" }>

export function AgentShowcaseSection({ section }: { section: AgentShowcaseSectionType }) {
  return (
    <section className="py-16 md:py-20 bg-white/5 border-t border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-4">
          {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
          <div className="space-y-3">
            {section.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-linear-to-r from-[#4f7cff]/15 via-[#2ee6a6]/15 to-[#ffd166]/15 p-6 shadow-lg">
            <div className="text-sm font-orbitron uppercase tracking-[0.18em] text-cyan-200">AI Operator</div>
            <p className="mt-2 text-lg font-semibold text-white">Always-on, brand-safe greeter for your experiences.</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200 list-disc list-inside">
              <li>Scripts intros and narrates updates in your tone.</li>
              <li>Optimized for widget, embed, and takeover layouts.</li>
              <li>Ready for live chat/video when you opt in.</li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={agentMedia.pictureUrl}
              alt="AI Operator"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />
            <div className="text-sm text-slate-300">Backed by 24/7 monitoring and mode-aware guardrails.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
