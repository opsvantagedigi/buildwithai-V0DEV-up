"use client"

import { useEffect, useState } from "react"
import type {
  AutonomyLevel,
  Diagnosis,
  MonitoringEvent,
  RemediationProposal,
  RemediationStep,
  RollbackPlan,
} from "@/lib/types"
import type { OperatorDiagnosisMessage } from "@/lib/protocol"

const sampleEvents: MonitoringEvent[] = [
  {
    id: "evt-1",
    timestamp: new Date().toISOString(),
    source: "edge-worker",
    severity: "warning",
    kind: "latency",
    message: "Homepage TTFB elevated to 450ms",
    context: { path: "/" },
  },
  {
    id: "evt-2",
    timestamp: new Date().toISOString(),
    source: "api",
    severity: "error",
    kind: "error",
    message: "POST /api/contact returned 500 for user 123",
    context: { path: "/api/contact" },
  },
]

type MonitoringPanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function MonitoringPanel({ sessionId, level }: MonitoringPanelProps) {
  const [events] = useState<MonitoringEvent[]>(sampleEvents)
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [proposals, setProposals] = useState<RemediationProposal[]>([])
  const [rollbacks, setRollbacks] = useState<RollbackPlan[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/monitoring/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ events }),
        })
        const data = await res.json().catch(() => ({}))
        const diagList = Array.isArray(data?.diagnoses) ? data.diagnoses : []
        const propList = Array.isArray(data?.proposals) ? data.proposals : []
        const rbList = Array.isArray(data?.rollbacks) ? data.rollbacks : []
        setDiagnoses(diagList)
        setProposals(propList)
        setRollbacks(rbList)

        const msg: OperatorDiagnosisMessage = {
          type: "operator:diagnosis",
          sessionId,
          diagnoses: diagList,
          proposals: propList,
        }
        window.parent.postMessage(msg, "*")
      } catch (err) {
        console.error("Failed to load monitoring data", err)
      }
    }

    load()
  }, [events, sessionId])

  const modeLine =
    level === "A"
      ? "Mode A: observing only."
      : level === "B"
      ? "Mode B: proposing fixes; requires your approval."
      : level === "C"
      ? "Mode C: (future) guarded autonomy; disabled here."
      : "Mode unspecified."

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Monitoring Dashboard</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>{modeLine}</p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Session {sessionId}: live diagnostics with proposed fixes and rollback plans. No autonomous execution.
      </p>

      <div style={{ display: "grid", gap: 12, maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
        <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Recent Events</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {events.map((evt) => (
              <div key={evt.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{evt.timestamp}</div>
                <div style={{ fontWeight: 600 }}>{evt.severity.toUpperCase()} · {evt.kind} · {evt.source}</div>
                <div style={{ fontSize: 14 }}>{evt.message}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Diagnoses</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {diagnoses.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No diagnoses yet.</div>}
            {diagnoses.map((diag) => (
              <div key={diag.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                <div style={{ fontWeight: 600 }}>{diag.summary}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>Confidence: {Math.round(diag.confidence * 100)}%</div>
                <div style={{ fontSize: 13, color: "#cbd5e1" }}>Evidence: {diag.evidence.join(" | ")}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1" }}>Causes: {diag.suspectedCauses.join(", ")}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Fix Proposals (Mode B)</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {proposals.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No proposals yet.</div>}
            {proposals.map((prop) => (
              <div key={prop.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                <div style={{ fontWeight: 600 }}>Proposal {prop.id}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1" }}>Impact: {prop.expectedImpact}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1" }}>Risk: {prop.risk}</div>
                <ul style={{ margin: "6px 0 0 16px", padding: 0, color: "#e5e7eb", fontSize: 13 }}>
                  {prop.steps.map((step: RemediationStep, idx: number) => (
                    <li key={`${prop.id}-step-${idx}`}>{step.description}</li>
                  ))}
                </ul>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  Requires approval: {prop.requiresApproval ? "Yes" : "No"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Rollback Plans (Mode B/C)</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {rollbacks.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No rollback plans yet.</div>}
            {rollbacks.map((plan) => (
              <div key={plan.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                <div style={{ fontWeight: 600 }}>{plan.id}</div>
                <ol style={{ margin: "6px 0 0 16px", padding: 0, color: "#e5e7eb", fontSize: 13 }}>
                  {plan.steps.map((step: string, idx: number) => (
                    <li key={`${plan.id}-step-${idx}`}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
