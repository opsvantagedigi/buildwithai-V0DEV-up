"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { agentMedia } from "@/config/agentMedia"
import { OPERATOR_EMBED_URL } from "@/config/operator"
import { CURRENT_OPERATOR_MODE, describeAutonomy, type MonitoringEvent } from "@/lib/ops/model"
import { requestDiagnosis, sendMonitoringEvents } from "@/lib/ops/client"
import { getOrCreateSessionId } from "@/lib/ops/session"

const modes = [
  { id: "chat" as const, label: "Chat" },
  { id: "video" as const, label: "Video" },
]

export function AgentWidget() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("chat")
  const [lastDiagnosisSummary, setLastDiagnosisSummary] = useState<string | null>(null)
  const [diagnosisLoading, setDiagnosisLoading] = useState(false)
  const sessionId = useMemo(() => getOrCreateSessionId(), [])
  const hasSentHandshakeEventRef = useRef(false)

  const autonomyDescription = useMemo(() => describeAutonomy(CURRENT_OPERATOR_MODE.level), [])

  const statusText = useMemo(() => (mode === "chat" ? "Operator App · Chat" : "Operator App · Video"), [mode])

  useEffect(() => {
    const allowedOrigin = (() => {
      try {
        return new URL(OPERATOR_EMBED_URL).origin
      } catch {
        return undefined
      }
    })()

    function handleMessage(event: MessageEvent) {
      if (!event.data || typeof event.data !== "object") return
      if (allowedOrigin && event.origin !== allowedOrigin) return

      const payload = event.data as { type?: string; sessionId?: string; mode?: string }
      if (payload.type === "operator:handshake") {
        if (!hasSentHandshakeEventRef.current) {
          const monitoringEvent: MonitoringEvent = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            source: "agent-widget",
            severity: "info",
            kind: "custom",
            message: "AgentWidget opened and Operator handshake received.",
            context: {
              sessionId: payload.sessionId,
              mode: payload.mode,
            },
          }

          sendMonitoringEvents([monitoringEvent])
          setDiagnosisLoading(true)
          requestDiagnosis([monitoringEvent])
            .then((result) => {
              if (result?.diagnoses?.length) {
                setLastDiagnosisSummary(result.diagnoses[0].summary)
              }
            })
            .finally(() => setDiagnosisLoading(false))
          hasSentHandshakeEventRef.current = true
        }

        console.log("Operator handshake received:", payload)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-white/15 bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] text-slate-900 transition hover:opacity-90"
        aria-expanded={open}
        aria-label="Open AI Operator widget"
      >
        <span className="relative inline-block">
          <img
            src={agentMedia.pictureUrl}
            alt="AI Operator"
            className="h-10 w-10 rounded-full border border-white/30 object-cover shadow-lg"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white/80 bg-emerald-400 shadow-[0_0_0_2px_rgba(255,255,255,0.6)]" />
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="text-sm font-semibold">AI Operator</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-800">Monitoring 24/7</span>
        </span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-90 max-w-[calc(100vw-2rem)] space-y-3">
          <div className="glass-panel rounded-3xl border border-white/10 bg-black/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3">
              <div className="relative inline-block">
                <img
                  src={agentMedia.pictureUrl}
                  alt="AI Operator"
                  className="h-12 w-12 rounded-full border border-white/20 object-cover shadow-lg"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white/80 bg-emerald-400 shadow-[0_0_0_2px_rgba(255,255,255,0.6)]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white">AI Operator</span>
                <span className="text-xs text-slate-300">{statusText}</span>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{autonomyDescription.title}</div>
                <div className="text-[11px] text-slate-400">{autonomyDescription.subtitle}</div>
              </div>
              <div className="ml-auto rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-200">
                Monitoring uptime, errors & funnels
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                    mode === m.id
                      ? "border-white/30 bg-linear-to-r from-[#4f7cff]/80 via-[#22c55e]/70 to-[#facc15]/70 text-slate-900"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <iframe
                  src={`${OPERATOR_EMBED_URL}?sessionId=${sessionId}&mode=${mode}&level=${CURRENT_OPERATOR_MODE.level}`}
                  className="h-64 w-full rounded-xl border border-white/10 bg-black"
                  title="Operator App"
                  sandbox="allow-scripts allow-same-origin"
                  allow="camera; microphone"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-linear-to-r from-white/5 via-white/5 to-white/0 p-4 text-sm text-slate-200">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-300">Roadmap</div>
              <ul className="mt-2 space-y-1 text-slate-200">
                <li><span className="font-semibold text-white">Mode B (now):</span> diagnoses issues and proposes fixes; human approval required.</li>
                <li><span className="font-semibold text-white">Mode C (future):</span> guarded autonomous remediation with rollback and audit trail.</li>
              </ul>
              {lastDiagnosisSummary && (
                <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-100">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">Last diagnosis</div>
                  <p>{lastDiagnosisSummary}</p>
                  {CURRENT_OPERATOR_MODE.level === "B" && (
                    <p className="mt-1 text-[10px] text-emerald-300/80">
                      Operator is in Mode B: proposals only, no automatic changes.
                    </p>
                  )}
                </div>
              )}
              {diagnosisLoading && !lastDiagnosisSummary && (
                <div className="mt-3 text-[11px] text-slate-400">Analysing widget activity with the Operator…</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
