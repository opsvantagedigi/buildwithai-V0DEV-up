import React from "react"
import { Block } from "@/lib/layout/schema"

type ButtonBlockType = Extract<Block, { kind: "button" }>

const variantClass: Record<NonNullable<ButtonBlockType["variant"]>, string> = {
  primary: "bg-white text-slate-900 hover:bg-slate-200",
  secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700",
  ghost: "text-white border border-white/20 hover:border-white/40",
}

export function ButtonBlock({ block }: { block: ButtonBlockType }) {
  const variant = block.variant ?? "primary"
  const size = block.size ?? "md"
  const sizeClass = size === "sm" ? "px-3 py-2 text-sm" : size === "lg" ? "px-6 py-3 text-base" : "px-5 py-2.5 text-sm"

  return (
    <a
      href={block.href}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition ${variantClass[variant]} ${sizeClass}`}
    >
      {block.label}
    </a>
  )
}
