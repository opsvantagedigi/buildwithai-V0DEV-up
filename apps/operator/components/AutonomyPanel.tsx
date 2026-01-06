"use client"

import { useEffect, useState } from "react"
import type { AuditLogEntry, AutonomyLevel, Snapshot } from "@/lib/types"

type AutonomyPanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

function allowedFor(level?: AutonomyLevel) {
  if (level === "A") return ["Observe only", "Collect diagnostics"]
  if (level === "B") return ["Auto-apply low-risk fixes", "Request approval for medium-risk", "Block high-risk"]
  if (level === "C") return ["Guarded autonomy", "Snapshot + verify + rollback", "Still block restricted areas"]
  return ["Mode unspecified; defaulting to safe observation."]
}

export default function AutonomyPanel({ sessionId, level }: AutonomyPanelProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/operator/fix")
        const data = await res.json().catch(() => ({}))
        setLogs(Array.isArray(data?.logs) ? data.logs : [])
        setSnapshots(Array.isArray(data?.snapshots) ? data.snapshots : [])
      } catch (err) {
        console.error("Failed to load autonomy state", err)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const allowed = allowedFor(level)
    window.parent.postMessage(
      {
        type: "operator:autonomy-state",
        sessionId,
        level,
        allowed,
        recentLogs: logs,
      },
      "*"
    )
  }, [level, logs, sessionId])

  async function triggerRollback(snapshotId: string) {
    setMessage(`Rolling back snapshot ${snapshotId}...`)
    try {
      const res = await fetch("/api/operator/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshotId, reason: "Manual rollback from AutonomyPanel" }),
      })
      const data = await res.json().catch(() => ({}))
      setMessage(data?.rollbackId ? `Rollback ${data.rollbackId} executed.` : "Rollback request completed.")

      if (data?.rollbackId) {
        window.parent.postMessage(
          {
            type: "operator:rollback-executed",
            sessionId,
            rollbackId: data.rollbackId,
            snapshotId,
            reason: "Manual rollback",
          },
          "*"
        )
      }
    } catch (err) {
      console.error("Rollback failed", err)
      setMessage("Rollback failed to execute.")
    }
  }

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Autonomy Control</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>
        Session {sessionId} · Mode {level ?? "unspecified"}
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Guarded hybrid autonomy: snapshots first, verification always, rollback on failure.
      </p>

      <section style={{ background: "#0f172a", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Allowed actions</h3>
        <ul style={{ margin: 0, paddingLeft: 16, color: "#e5e7eb", fontSize: 13 }}>
          {allowedFor(level).map((item, idx) => (
            <li key={`allowed-${idx}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ background: "#0f172a", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Recent actions</h3>
        {logs.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No audit logs yet.</div>}
        <div style={{ display: "grid", gap: 8 }}>
          {logs.map((log) => (
            <div key={log.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
              <div style={{ fontWeight: 600 }}>{log.actionType}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{log.timestamp}</div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>Risk: {log.risk}</div>
              {log.message && <div style={{ fontSize: 13, color: "#cbd5e1" }}>{log.message}</div>}
              {log.snapshotId && <div style={{ fontSize: 12, color: "#a5b4fc" }}>Snapshot: {log.snapshotId}</div>}
              {log.rollbackId && <div style={{ fontSize: 12, color: "#a5b4fc" }}>Rollback: {log.rollbackId}</div>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Snapshots</h3>
        {snapshots.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No snapshots captured yet.</div>}
        <div style={{ display: "grid", gap: 8 }}>
          {snapshots.map((snap) => (
            <div key={snap.id} style={{ background: "#111827", padding: 8, borderRadius: 8, display: "grid", gap: 4 }}>
              <div style={{ fontWeight: 600 }}>{snap.id}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{snap.timestamp}</div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>{snap.reason}</div>
              <div style={{ fontSize: 12, color: "#a5b4fc" }}>Risk: {snap.riskLevel}</div>
              <div style={{ fontSize: 12, color: "#cbd5e1" }}>Files: {snap.affectedFiles.join(", ") || "n/a"}</div>
              <button
                type="button"
                onClick={() => triggerRollback(snap.id)}
                style={{
                  marginTop: 4,
                  borderRadius: 8,
                  border: "1px solid #f97316",
                  background: "#7c2d12",
                  color: "#ffedd5",
                  padding: "6px 10px",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                Roll back to snapshot
              </button>
            </div>
          ))}
        </div>
      </section>

      {message && <div style={{ marginTop: 12, fontSize: 13, color: "#cbd5e1" }}>{message}</div>}
    </div>
  )
}
