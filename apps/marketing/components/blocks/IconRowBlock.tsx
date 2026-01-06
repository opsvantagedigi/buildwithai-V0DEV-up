import React from "react"
import { Block } from "@/lib/layout/schema"

type IconBlockType = Extract<Block, { kind: "iconWithText" }>

export function IconRowBlock({ block }: { block: IconBlockType }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white text-sm font-semibold">
        {block.icon}
      </div>
      <div className="space-y-1">
        <div className="text-base text-white">{block.text}</div>
        {block.subtext && <div className="text-sm text-slate-400">{block.subtext}</div>}
      </div>
    </div>
  )
}
