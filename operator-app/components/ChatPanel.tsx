import type { AutonomyLevel } from "@/lib/types"

type ChatPanelProps = {
  level?: AutonomyLevel
}

export default function ChatPanel({ level }: ChatPanelProps) {
  const modeLine =
    level === "A"
      ? "Currently observing signals only (Mode A)."
      : level === "B"
      ? "Able to propose fixes with your approval (Mode B)."
      : level === "C"
      ? "Will be able to apply guarded fixes with rollback (Mode C)."
      : "Operator mode not specified."

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Live Operator Chat (placeholder)</h2>
      <p style={{ margin: 0, marginBottom: 10, color: "#a5b4fc", fontSize: 12 }}>{modeLine}</p>
      <div style={{ display: "grid", gap: 8, color: "#cbd5e1", fontSize: 14 }}>
        <div style={{ background: "#0f172a", padding: 10, borderRadius: 10 }}>Operator: Monitoring uptime, errors, and funnels.</div>
        <div style={{ background: "#111827", padding: 10, borderRadius: 10 }}>User: Can you check today’s error spikes?</div>
        <div style={{ background: "#0f172a", padding: 10, borderRadius: 10 }}>Operator: Noticed elevated 5xx on checkout. I can propose fixes.</div>
      </div>
      <p style={{ marginTop: 12, color: "#94a3b8", fontSize: 12 }}>
        This will be replaced with real-time Operator chat.
      </p>
    </div>
  )
}
