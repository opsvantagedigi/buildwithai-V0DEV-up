"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { OperatorRole } from "@/lib/operator-auth"

type Props = {
  email: string
  role: OperatorRole
}

export default function OperatorTopBar({ email, role }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSwitchUser = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/operator/logout", { method: "POST" })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error || "Unable to switch user")
        return
      }
      router.push("/operator-login")
    } catch (err) {
      setError("Unable to switch user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ color: "#cbd5e1", fontSize: 14 }}>
        Signed in as <strong>{email}</strong> (<span style={{ textTransform: "capitalize" }}>{role}</span>)
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {error && <span style={{ color: "#fca5a5", fontSize: 12 }}>{error}</span>}
        <button
          type="button"
          onClick={onSwitchUser}
          disabled={loading}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #1f2937",
            background: loading ? "#1f2937" : "#0ea5e9",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Switching..." : "Switch user"}
        </button>
      </div>
    </header>
  )
}
