import React from "react"
import { Section } from "@/lib/layout/schema"
import { BlockRenderer } from "@/components/layout/LayoutRenderer"

type AgentSupportSectionType = Extract<Section, { type: "agentSupport" }>

export function AgentSupportSection({ section }: { section: AgentSupportSectionType }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-4">
          {section.title && <h2 className="text-3xl font-semibold text-white">{section.title}</h2>}
          <p className="text-slate-300 leading-relaxed">
            24/7 AI Operator monitors uptime, errors, and logs. Current mode (B): diagnose and propose fixes with
            human-in-the-loop. Future mode (C): autonomous remediation with rollback and full audit trail.
          </p>
          <div className="space-y-3">
            {section.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
          <div className="text-sm font-semibold text-cyan-300">Operator Capabilities</div>
          <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
            <li>Live monitoring of errors, latency, and WebRTC/WebSocket health</li>
            <li>Diagnosis and fix proposals with rollback plans</li>
            <li>Planned autonomy (mode C) with guarded execution</li>
            <li>Audit trail and event logging for compliance</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
