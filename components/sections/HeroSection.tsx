import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type HeroSectionType = Extract<Section, { type: "hero" }>

export function HeroSection({ section }: { section: HeroSectionType }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-6">
          {section.eyebrow && (
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {section.eyebrow}
            </div>
          )}
          {section.title && (
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white">
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
