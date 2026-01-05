"use client"

import { useEffect, useRef, useState } from "react"
import type { AutonomyLevel, ChatMessage } from "@/lib/types"
import type {
  OperatorApprovalRequiredMessage,
  OperatorAutonomyStateMessage,
  OperatorDiagnosisMessage,
  OperatorFixAppliedMessage,
  OperatorFixFailedMessage,
  OperatorRollbackExecutedMessage,
} from "@/lib/protocol"

type ChatPanelProps = {
  level?: AutonomyLevel
  sessionId?: string
}

export default function ChatPanel({ level, sessionId }: ChatPanelProps) {
  const effectiveSessionId = sessionId || "demo-session"
  const modeLine =
    level === "A"
      ? "Mode A: observing signals only."
      : level === "B"
      ? "Mode B: can propose fixes with your approval."
      : level === "C"
      ? "Mode C: future guarded autonomy (not enabled here)."
      : "Operator mode not specified."

  const sessionLine = `Memory is active for session ${effectiveSessionId}. Responses reference recent history.`

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "operator",
      text: "Hi! I'm your AI Operator. I keep session memory, retrieve site context, and guide onboarding.",
    },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)

  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, sending])

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as
        | OperatorDiagnosisMessage
        | OperatorFixAppliedMessage
        | OperatorFixFailedMessage
        | OperatorApprovalRequiredMessage
        | OperatorRollbackExecutedMessage
        | OperatorAutonomyStateMessage
        | undefined

      if (!data) return

      if (data.type === "operator:diagnosis") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: "I've analyzed recent events and prepared fix proposals. Switch to Monitor mode to review.",
          },
        ])
      }

      if (data.type === "operator:fix-applied") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: `Fix ${data.proposalId} applied (risk: ${data.risk}). Snapshot ${data.snapshotId ?? "n/a"}.`,
          },
        ])
      }

      if (data.type === "operator:fix-failed") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: `Fix ${data.proposalId} failed; rollback ${data.rollbackId ?? "n/a"}. Reason: ${data.reason ?? "unknown"}.`,
          },
        ])
      }

      if (data.type === "operator:approval-required") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: `Approval required for fix ${data.proposalId} (risk: ${data.risk}). Review in Fix Review panel.`,
          },
        ])
      }

      if (data.type === "operator:rollback-executed") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: `Rollback ${data.rollbackId} executed. Snapshot ${data.snapshotId ?? "n/a"}.`,
          },
        ])
      }

      if (data.type === "operator:autonomy-state") {
        setMessages((prev) => [
          ...prev,
          {
            from: "operator",
            text: `Autonomy state updated. Allowed actions: ${data.allowed.join("; ")}.`,
          },
        ])
      }
    }

    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  async function sendMessage() {
    if (!input.trim()) return
    const userMsg: ChatMessage = { from: "user", text: input }
    setMessages((prev) => [...prev, userMsg])
    const toSend = input
    setInput("")
    setSending(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: effectiveSessionId, message: toSend }),
      })
      const data = await res.json().catch(() => undefined)
      const replyText = data?.reply ?? "I'm here to help with onboarding, site info, and monitoring."
      setMessages((prev) => [...prev, { from: "operator", text: replyText }])
    } catch (error) {
      console.error("Failed to send chat", error)
      setMessages((prev) => [...prev, { from: "operator", text: "Sorry, I couldn't respond right now." }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Live Operator Chat</h2>
      <p style={{ margin: 0, marginBottom: 4, color: "#a5b4fc", fontSize: 12 }}>{modeLine}</p>
      <p style={{ margin: 0, marginBottom: 10, color: "#7dd3fc", fontSize: 12 }}>{sessionLine}</p>
      <div
        ref={listRef}
        style={{ display: "grid", gap: 8, color: "#cbd5e1", fontSize: 14, maxHeight: 240, overflowY: "auto", paddingRight: 4 }}
      >
        {messages.map((msg, idx) => (
          <div
            key={`${msg.from}-${idx}`}
            style={{
              background: msg.from === "operator" ? "#0f172a" : "#111827",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <strong style={{ color: "#e0e7ff", marginRight: 6 }}>{msg.from === "operator" ? "Operator:" : "You:"}</strong>
            <span>{msg.text}</span>
          </div>
        ))}
        {sending && <div style={{ color: "#9ca3af", fontSize: 12 }}>Operator is thinking…</div>}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about onboarding or your site"
          style={{
            flex: 1,
            borderRadius: 10,
            border: "1px solid #1f2937",
            background: "#0f172a",
            color: "#e5e7eb",
            padding: "10px 12px",
          }}
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={sending}
          style={{
            borderRadius: 10,
            background: "linear-gradient(90deg, #4f7cff, #2ee6a6, #ffd166)",
            color: "#0b1224",
            fontWeight: 700,
            padding: "10px 14px",
            border: "none",
            cursor: sending ? "not-allowed" : "pointer",
            opacity: sending ? 0.7 : 1,
            minWidth: 88,
          }}
        >
          {sending ? "Sending" : "Send"}
        </button>
      </div>
    </div>
  )
}
