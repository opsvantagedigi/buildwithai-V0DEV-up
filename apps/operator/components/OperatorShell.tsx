"use client"

import { useEffect } from "react"
import ChatPanel from "./ChatPanel"
import AutonomyPanel from "./AutonomyPanel"
import FixReviewPanel from "./FixReviewPanel"
import MonitoringPanel from "./MonitoringPanel"
import EmailSettingsPanel from "./EmailSettingsPanel"
import IntelligencePanel from "./IntelligencePanel"
import VideoPanel from "./VideoPanel"
import type { AutonomyLevel } from "@/lib/types"
import type { OperatorHandshakeMessage } from "@/lib/protocol"

type OperatorShellProps = {
  sessionId: string
  mode: "chat" | "video" | "monitor" | "fix-review" | "autonomy" | "email-settings" | "intel"
  level?: AutonomyLevel
}

export default function OperatorShell({ sessionId, mode, level }: OperatorShellProps) {
  useEffect(() => {
    const handshake: OperatorHandshakeMessage = {
      type: "operator:handshake",
      sessionId,
      mode,
      level,
    }
    window.parent.postMessage(handshake, "*")
  }, [level, mode, sessionId])

  return (
    <div style={{ minHeight: "100vh", background: "#040711", color: "#e5e7eb", padding: "16px" }}>
      {mode === "video" && <VideoPanel />}
      {mode === "chat" && <ChatPanel level={level} sessionId={sessionId} />}
      {mode === "monitor" && <MonitoringPanel sessionId={sessionId} level={level} />}
      {mode === "fix-review" && <FixReviewPanel sessionId={sessionId} level={level} />}
      {mode === "autonomy" && <AutonomyPanel sessionId={sessionId} level={level} />}
      {mode === "email-settings" && <EmailSettingsPanel sessionId={sessionId} level={level} />}
      {mode === "intel" && <IntelligencePanel sessionId={sessionId} level={level} />}
    </div>
  )
}
