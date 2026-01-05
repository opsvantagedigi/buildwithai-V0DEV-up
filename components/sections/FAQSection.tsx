import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type FAQSectionType = Extract<Section, { type: "faq" }>

export function FAQSection({ section }: { section: FAQSectionType }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 space-y-6">
        {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
        <div className="space-y-4">
          {section.blocks.map((block, idx) => (
            <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}
