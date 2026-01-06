"use client"

import { useEffect, useState } from "react"
import type { AutonomyLevel, Diagnosis, RemediationProposal, RemediationStep, RollbackPlan } from "@/lib/types"
import type {
  OperatorApprovalRequiredMessage,
  OperatorEmailStatusMessage,
  OperatorFixAppliedMessage,
  OperatorFixFailedMessage,
} from "@/lib/protocol"

const samplePayload = {
  events: [
    {
      id: "evt-fix-1",
      timestamp: new Date().toISOString(),
      source: "api",
      severity: "error",
      kind: "error",
      message: "POST /api/forms returned 500",
    },
  ],
}

type FixReviewPanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function FixReviewPanel({ sessionId, level }: FixReviewPanelProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [proposals, setProposals] = useState<RemediationProposal[]>([])
  const [rollbacks, setRollbacks] = useState<Record<string, RollbackPlan>>({})
  const [status, setStatus] = useState<string>("")

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/monitoring/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(samplePayload),
        })
        const data = await res.json().catch(() => ({}))
        const rollbacksMap: Record<string, RollbackPlan> = {}
        if (Array.isArray(data?.rollbacks)) {
          data.rollbacks.forEach((rb: RollbackPlan) => {
            rollbacksMap[rb.id] = rb
          })
        }
        setDiagnoses(Array.isArray(data?.diagnoses) ? data.diagnoses : [])
        setProposals(Array.isArray(data?.proposals) ? data.proposals : [])
        setRollbacks(rollbacksMap)
      } catch (err) {
        console.error("Failed to load fix proposals", err)
      }
    }

    load()
  }, [])

  async function submit(proposal: RemediationProposal, approved: boolean) {
    setStatus(approved ? "Applying low/medium risk fix..." : "Logging approval requirement...")
    try {
      const res = await fetch("/api/operator/fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal, approved, rollbackPlan: rollbacks[`rollback-${proposal.diagnosisId}`] }),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(data?.message || `Fix response: ${data?.status ?? "unknown"}`)

      const notifyEmail = (category: OperatorEmailStatusMessage["category"], sent = true, reason?: string) => {
        const msg: OperatorEmailStatusMessage = { type: "operator:email-status", category, sent, reason }
        window.parent.postMessage(msg, "*")
      }

      if (data?.status === "applied") {
        const msg: OperatorFixAppliedMessage = {
          type: "operator:fix-applied",
          sessionId,
          proposalId: proposal.id,
          snapshotId: data?.snapshotId,
          risk: data?.risk ?? proposal.risk,
        }
        window.parent.postMessage(msg, "*")
        notifyEmail("fix-applied")
      } else if (data?.status === "pending-approval") {
        const msg: OperatorApprovalRequiredMessage = {
          type: "operator:approval-required",
          sessionId,
          proposalId: proposal.id,
          risk: data?.risk ?? proposal.risk,
        }
        window.parent.postMessage(msg, "*")
        notifyEmail("approval-required")
      } else if (data?.status === "rolled-back" || data?.status === "rejected") {
        const msg: OperatorFixFailedMessage = {
          type: "operator:fix-failed",
          sessionId,
          proposalId: proposal.id,
          rollbackId: data?.rollbackId,
          snapshotId: data?.snapshotId,
          risk: data?.risk ?? proposal.risk,
          reason: data?.message,
        }
        window.parent.postMessage(msg, "*")
        notifyEmail(data?.status === "rejected" ? "high-risk-blocked" : "fix-failed")
      }
    } catch (err) {
      console.error("Failed to process fix", err)
      setStatus("Failed to process fix request.")
    }
  }

  const modeLine =
    level === "A"
      ? "Mode A: observation only; approvals required."
      : level === "B"
      ? "Mode B: may auto-apply low-risk; approval for medium."
      : level === "C"
      ? "Mode C: guarded autonomy (still logged)."
      : "Mode unspecified."

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Fix Review</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>{modeLine}</p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Session {sessionId}: approve or decline proposed fixes. High-risk fixes are blocked.
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#94a3b8", fontSize: 12 }}>Diagnoses: {diagnoses.length}</p>

      <div style={{ display: "grid", gap: 12, maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
        {proposals.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No proposals available.</div>}

        {proposals.map((prop) => {
          const rollback = rollbacks[`rollback-${prop.diagnosisId}`]
          return (
            <div key={prop.id} style={{ background: "#0f172a", borderRadius: 10, padding: 12, display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <div style={{ fontWeight: 700 }}>Proposal {prop.id}</div>
                <div style={{ fontSize: 12, color: "#f9a8d4" }}>Risk: {prop.risk}</div>
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>{prop.expectedImpact}</div>
              <ul style={{ margin: 0, paddingLeft: 16, color: "#e5e7eb", fontSize: 13 }}>
                {prop.steps.map((step: RemediationStep, idx: number) => (
                  <li key={`${prop.id}-step-${idx}`}>{step.description}</li>
                ))}
              </ul>
              {rollback && (
                <div style={{ fontSize: 12, color: "#a5b4fc" }}>
                  Rollback plan: {rollback.steps.join(" → ")}; verify: {rollback.verificationCriteria.join(", ")}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => submit(prop, true)}
                  style={{
                    borderRadius: 8,
                    border: "1px solid #22c55e",
                    background: "#064e3b",
                    color: "#ecfdf3",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Approve & Apply
                </button>
                <button
                  type="button"
                  onClick={() => submit(prop, false)}
                  style={{
                    borderRadius: 8,
                    border: "1px solid #fbbf24",
                    background: "#78350f",
                    color: "#fffbeb",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Request Approval
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {status && <div style={{ marginTop: 12, fontSize: 13, color: "#cbd5e1" }}>{status}</div>}
    </div>
  )
}
