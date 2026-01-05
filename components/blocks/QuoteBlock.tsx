import React from "react"
import { Block } from "@/lib/layout/schema"

type QuoteBlockType = Extract<Block, { kind: "quote" }>

export function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <blockquote className="text-lg text-slate-100 italic">“{block.quote}”</blockquote>
      {(block.author || block.role) && (
        <figcaption className="mt-3 text-sm text-slate-400">
          {block.author}
          {block.role ? `, ${block.role}` : ""}
        </figcaption>
      )}
    </figure>
  )
}
