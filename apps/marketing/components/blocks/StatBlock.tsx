import React from "react"
import { Block } from "@/lib/layout/schema"

type StatBlockType = Extract<Block, { kind: "stat" }>

export function StatBlock({ block }: { block: StatBlockType }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="text-3xl font-semibold text-white">{block.value}</div>
      <div className="text-sm text-slate-400 mt-1">{block.label}</div>
    </div>
  )
}
