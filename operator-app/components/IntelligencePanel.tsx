"use client"

import { useEffect, useState } from "react"
import type { AutonomyLevel, IncidentPattern, IncidentRecord, IncidentSummary } from "@/lib/types"

type IntelResponse = {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  summary: IncidentSummary
}

type IntelligencePanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function IntelligencePanel({ sessionId, level }: IntelligencePanelProps) {
  const [data, setData] = useState<IntelResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch("/api/intel/summary")
        const json = await res.json().catch(() => null)
        setData(json)
      } catch (err) {
        setError("Failed to load intelligence summary")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const summary = data?.summary
  const topPatterns = summary?.topPatterns?.length ? summary.topPatterns : data?.patterns.slice(0, 5) ?? []
  const recentIncidents = data?.incidents.slice(0, 10) ?? []

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Operator Intelligence</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>
        Session {sessionId} · Mode {level ?? "unspecified"}
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Learned patterns from recent incidents, fixes, and rollbacks.
      </p>

      {loading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading intelligence...</div>}
      {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}

      {!loading && !error && summary && (
        <div style={{ display: "grid", gap: 12 }}>
          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Health summary</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Incidents: {summary.totalIncidents}</div>
              <div>Fix success: {summary.fixSuccessCount} · Fix failure: {summary.fixFailureCount} · Rollbacks: {summary.rollbackCount}</div>
              <div>High-risk blocked: {summary.highRiskBlockedCount} · Approvals required: {summary.approvalsRequiredCount ?? 0}</div>
              <div>Emails sent: {summary.emailsSentCount ?? 0} · Emails failed: {summary.emailsFailedCount ?? 0}</div>
            </div>
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Patterns</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Top recurring patterns:</div>
              <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                {topPatterns.length === 0 && <li>No patterns yet.</li>}
                {topPatterns.map((p) => (
                  <li key={`${p.type}-${p.key}`}>
                    {p.type}: {p.key} — {p.occurrences} occurrences · last seen {p.lastSeenAt}
                    {typeof p.successCount !== "undefined" && ` · success: ${p.successCount}`}
                    {typeof p.failureCount !== "undefined" && ` · failures: ${p.failureCount}`}
                    {typeof p.rollbackCount !== "undefined" && ` · rollbacks: ${p.rollbackCount}`}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Recent incidents</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              {recentIncidents.length === 0 && <div>No incidents recorded yet.</div>}
              {recentIncidents.map((inc) => (
                <div key={inc.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                  <div style={{ fontWeight: 600 }}>{inc.summary || inc.actionType || "Incident"}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{inc.timestamp}</div>
                  {inc.source && <div style={{ fontSize: 12, color: "#a5b4fc" }}>Source: {inc.source}</div>}
                  {inc.message && <div style={{ fontSize: 12, color: "#cbd5e1" }}>{inc.message}</div>}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
