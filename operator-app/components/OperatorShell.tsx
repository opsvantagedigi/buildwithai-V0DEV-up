"use client"

import { useEffect } from "react"
import ChatPanel from "./ChatPanel"
import VideoPanel from "./VideoPanel"
import type { OperatorHandshakeMessage } from "@/lib/protocol"

type OperatorShellProps = {
  sessionId: string
  mode: "chat" | "video"
}

export default function OperatorShell({ sessionId, mode }: OperatorShellProps) {
  useEffect(() => {
    const handshake: OperatorHandshakeMessage = {
      type: "operator:handshake",
      sessionId,
      mode,
    }
    window.parent.postMessage(handshake, "*")
  }, [mode, sessionId])

  return (
    <div style={{ minHeight: "100vh", background: "#040711", color: "#e5e7eb", padding: "16px" }}>
      {mode === "video" ? <VideoPanel /> : <ChatPanel />}
    </div>
  )
}
