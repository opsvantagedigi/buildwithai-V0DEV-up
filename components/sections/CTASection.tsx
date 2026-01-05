import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type CTASectionType = Extract<Section, { type: "cta" }>

export function CTASection({ section }: { section: CTASectionType }) {
  const align = section.align ?? "center"
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center"

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-4 ${alignClass}`}>
          {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
          <div className="flex flex-wrap gap-3 justify-center">
            {section.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
