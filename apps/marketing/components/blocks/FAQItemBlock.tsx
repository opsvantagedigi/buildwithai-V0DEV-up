import React from "react"
import { Block } from "@/lib/layout/schema"

type FAQItemBlockType = Extract<Block, { kind: "faqItem" }>

export function FAQItemBlock({ block }: { block: FAQItemBlockType }) {
  return (
    <details className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <summary className="cursor-pointer text-base font-semibold text-white">{block.question}</summary>
      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{block.answer}</p>
    </details>
  )
}
