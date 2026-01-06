import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type HeroSectionType = Extract<Section, { type: "hero" }>

export function HeroSection({ section }: { section: HeroSectionType }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          {section.eyebrow && (
            <div className="text-xs font-orbitron font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {section.eyebrow}
            </div>
          )}
          {section.title && (
            <h1 className="text-4xl md:text-6xl font-orbitron font-extrabold leading-tight tracking-tight bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] bg-clip-text text-transparent">
              {section.title}
            </h1>
          )}
          <div className="space-y-4">
            {section.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
