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
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b1224" }}>
      <form
        onSubmit={onSubmit}
        style={{ background: "#0f172a", padding: 24, borderRadius: 12, width: 320, color: "#e5e7eb", display: "grid", gap: 12 }}
      >
        <h1 style={{ margin: 0, fontSize: 18 }}>Operator Login</h1>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1px solid #1f2937", background: "#111827", color: "#e5e7eb" }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: "1px solid #1f2937", background: "#111827", color: "#e5e7eb" }}
          />
        </label>
        {error && <div style={{ color: "#fca5a5", fontSize: 12 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #1f2937",
            background: loading ? "#1f2937" : "#2563eb",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  )
}
