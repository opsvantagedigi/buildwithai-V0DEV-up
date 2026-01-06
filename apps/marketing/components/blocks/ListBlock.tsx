import React from "react"
import { Block } from "@/lib/layout/schema"

type ListBlockType = Extract<Block, { kind: "list" }>

export function ListBlock({ block }: { block: ListBlockType }) {
  const variant = block.variant ?? "bulleted"
  const listClass = variant === "inline" ? "flex flex-wrap gap-3" : "space-y-2"
  const ItemTag = variant === "numbered" ? "ol" : variant === "inline" ? "ul" : "ul"
  const bulletClass = variant === "numbered" ? "list-decimal" : variant === "bulleted" ? "list-disc" : "list-none"

  const items = (
    <ItemTag className={`${listClass} ${bulletClass} text-slate-300 pl-4`}>
      {block.items.map((item, idx) => (
        <li key={idx} className={variant === "inline" ? "px-3 py-1 rounded-full bg-white/5 border border-white/10" : ""}>
          {item}
        </li>
      ))}
    </ItemTag>
  )

  return <div>{items}</div>
}
