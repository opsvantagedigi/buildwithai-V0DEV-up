"use client"

import { useEffect } from "react"
import ChatPanel from "./ChatPanel"
import VideoPanel from "./VideoPanel"
import type { AutonomyLevel } from "@/lib/types"
import type { OperatorHandshakeMessage } from "@/lib/protocol"

type OperatorShellProps = {
  sessionId: string
  mode: "chat" | "video"
  level?: AutonomyLevel
}

export default function OperatorShell({ sessionId, mode, level }: OperatorShellProps) {
  useEffect(() => {
    const handshake: OperatorHandshakeMessage = {
      type: "operator:handshake",
      sessionId,
      mode,
      ...(level ? { level } : {}),
    }
    window.parent.postMessage(handshake, "*")
  }, [level, mode, sessionId])

  return (
    <div style={{ minHeight: "100vh", background: "#040711", color: "#e5e7eb", padding: "16px" }}>
      {mode === "video" ? <VideoPanel /> : <ChatPanel level={level} />}
    </div>
  )
}
