import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"
import { agentMedia } from "@/config/agentMedia"

type AgentShowcaseSectionType = Extract<Section, { type: "agentShowcase" }>

export function AgentShowcaseSection({ section }: { section: AgentShowcaseSectionType }) {
  return (
    <section className="py-16 md:py-20 bg-white/5 border-t border-b border-white/10">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-4">
          {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
          <div className="space-y-3">
            {section.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-lg">
            <video
              src={agentMedia.introVideoUrl}
              className="w-full h-full"
              controls
              muted
              playsInline
            />
          </div>
          <div className="flex items-center gap-3">
            <img
              src={agentMedia.pictureUrl}
              alt="AI Operator"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />
            <div className="text-sm text-slate-300">Always-on AI Operator showcasing your brand.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
