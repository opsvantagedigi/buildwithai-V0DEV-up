import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type TestimonialSectionType = Extract<Section, { type: "testimonials" }>

export function TestimonialSection({ section }: { section: TestimonialSectionType }) {
  const cols = section.columns ?? 2
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 space-y-8">
        {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
        <div className={`grid gap-6 md:grid-cols-${cols}`.replace("md:grid-cols-2", cols === 2 ? "md:grid-cols-2" : `md:grid-cols-${cols}`)}>
          {section.blocks.map((block, idx) => (
            <div key={`${block.kind}-${idx}`} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <BlockRenderer block={block} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
