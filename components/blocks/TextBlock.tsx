import React from "react"
import { Block } from "@/lib/layout/schema"

type ParagraphBlockType = Extract<Block, { kind: "paragraph" }>
type QuoteBlockType = Extract<Block, { kind: "quote" }>

export function TextBlock({ block }: { block: ParagraphBlockType | QuoteBlockType }) {
  if (block.kind === "quote") {
    return (
      <blockquote className="border-l-4 border-cyan-400/60 pl-4 text-lg text-slate-200 italic">
        {block.quote}
        {block.author && (
          <footer className="mt-2 text-sm text-slate-400">
            — {block.author}
            {block.role ? `, ${block.role}` : ""}
          </footer>
        )}
      </blockquote>
    )
  }

  const alignClass =
    block.align === "center" ? "text-center" : block.align === "right" ? "text-right" : "text-left"

  return <p className={`text-base leading-relaxed text-slate-300 ${alignClass}`}>{block.text}</p>
}
