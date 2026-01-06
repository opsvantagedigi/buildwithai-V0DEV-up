"use client"

import { useState } from "react"

type VideoPanelProps = {
  sessionId?: string
}

export default function VideoPanel({ sessionId }: VideoPanelProps) {
  const [joining, setJoining] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const effectiveSessionId = sessionId || "demo-session"

  async function joinSession() {
    setJoining(true)
    try {
      const res = await fetch("/api/video/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: effectiveSessionId }),
      })
      const data = await res.json().catch(() => undefined)
      if (data?.url) {
        setVideoUrl(data.url)
        window.open(data.url, "_blank")
      }
    } catch (error) {
      console.error("Failed to join video session", error)
    } finally {
      setJoining(false)
    }
  }

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Live Operator Video</h2>
      <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid #1f2937", background: "#0f172a", height: 220 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8", padding: 16, textAlign: "center" }}>
          {videoUrl ? "Opening your live session in a new tab…" : "Join a live Operator session to collaborate over video."}
        </div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button
          type="button"
          onClick={joinSession}
          disabled={joining}
          style={{
            borderRadius: 10,
            background: "linear-gradient(90deg, #4f7cff, #2ee6a6, #ffd166)",
            color: "#0b1224",
            fontWeight: 700,
            padding: "10px 14px",
            border: "none",
            cursor: joining ? "not-allowed" : "pointer",
            opacity: joining ? 0.7 : 1,
            minWidth: 140,
          }}
        >
          {joining ? "Connecting…" : "Join live session"}
        </button>
        <div style={{ color: "#94a3b8", fontSize: 12, alignSelf: "center" }}>
          Opens a secure room for your Operator and team. Placeholder link for now.
        </div>
      </div>
    </div>
  )
}
