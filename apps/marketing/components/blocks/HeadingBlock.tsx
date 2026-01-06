import React from "react"
import { Block } from "@/lib/layout/schema"

type HeadingBlockType = Extract<Block, { kind: "heading" }> | Extract<Block, { kind: "subheading" }>

export function HeadingBlock({ block }: { block: HeadingBlockType }) {
  const level: 1 | 2 | 3 | 4 = block.kind === "heading" ? block.level ?? 2 : 3
  const Tag = (`h${level}` as "h1" | "h2" | "h3" | "h4")

  const baseClass =
    block.kind === "heading"
      ? "text-3xl md:text-4xl font-semibold tracking-tight text-white"
      : "text-xl md:text-2xl font-semibold text-slate-200"

  const alignClass =
    block.align === "center" ? "text-center" : block.align === "right" ? "text-right" : "text-left"

  return <Tag className={`${baseClass} ${alignClass}`}>{block.text}</Tag>
}
