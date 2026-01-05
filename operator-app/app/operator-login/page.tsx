"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function OperatorLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@buildwithai.digital")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push("/operator")
        return
      }

      const data = await res.json().catch(() => null)
      setError(data?.error || "Invalid credentials")
    } catch (err) {
      setError("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b1f46 0%, #0a3c52 45%, #0b4a2e 70%, #b58b00 100%)",
        color: "#e5e7eb",
        fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "rgba(7, 12, 26, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: 28,
          borderRadius: 16,
          width: 360,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          display: "grid",
          gap: 16,
        }}
      >
        <div style={{ display: "grid", justifyItems: "center", gap: 10 }}>
          <div
            aria-hidden
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a8a, #0ea5e9)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Orbitron, 'Segoe UI', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            OV
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontFamily: "Orbitron, 'Segoe UI', system-ui, sans-serif",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Operator Login
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", textAlign: "center" }}>Welcome Operator. Your legacy begins here.</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#cbd5e1", fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif" }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #1f2937",
                background: "#0f172a",
                color: "#e5e7eb",
                fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              }}
            />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#cbd5e1", fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif" }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #1f2937",
                background: "#0f172a",
                color: "#e5e7eb",
                fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              }}
            />
          </label>
          {error && <div style={{ color: "#fca5a5", fontSize: 12 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #1d4ed8",
              background: loading ? "#1f2937" : "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 700,
              fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              letterSpacing: 0.3,
              transition: "transform 120ms ease, box-shadow 120ms ease",
              boxShadow: loading ? "none" : "0 12px 30px rgba(14,165,233,0.25)",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ color: "#93c5fd", fontSize: 13, textDecoration: "none" }}>
            Back to public site
          </a>
        </div>
      </div>
    </main>
  )
}
