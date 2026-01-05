"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { OperatorRole, OperatorUser } from "@/lib/operator-auth-node"

const roleOptions: OperatorRole[] = ["admin", "operator", "auditor"]

type Props = {
  users: OperatorUser[]
}

export default function OperatorUsersTable({ users }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const mutate = async (path: string, body: object) => {
    setError(null)
    setBusy(true)
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setBusy(false)
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error || "Request failed")
      return false
    }
    startTransition(() => router.refresh())
    return true
  }

  const onChangeRole = async (email: string, role: OperatorRole) => {
    await mutate("/api/operator/users/set-role", { email, role })
  }

  const onDelete = async (email: string) => {
    if (!confirm(`Delete ${email}?`)) return
    await mutate("/api/operator/users/delete", { email })
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#0f172a", borderRadius: 10, overflow: "hidden" }}>
        <thead style={{ background: "#111827", color: "#cbd5e1", textAlign: "left" }}>
          <tr>
            <th style={{ padding: "10px 12px" }}>Email</th>
            <th style={{ padding: "10px 12px" }}>Role</th>
            <th style={{ padding: "10px 12px" }}>Created</th>
            <th style={{ padding: "10px 12px", width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} style={{ borderTop: "1px solid #1f2937" }}>
              <td style={{ padding: "10px 12px", color: "#e5e7eb" }}>{u.email}</td>
              <td style={{ padding: "10px 12px" }}>
                <select
                  defaultValue={u.role}
                  disabled={pending || busy}
                  onChange={(e) => onChangeRole(u.email, e.target.value as OperatorRole)}
                  style={{ padding: 8, borderRadius: 8, background: "#0b1224", color: "#e5e7eb", border: "1px solid #1f2937" }}
                >
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ padding: "10px 12px", color: "#cbd5e1", fontSize: 13 }}>{new Date(u.createdAt).toLocaleString()}</td>
              <td style={{ padding: "10px 12px" }}>
                <button
                  type="button"
                  disabled={pending || busy}
                  onClick={() => onDelete(u.email)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid #1f2937",
                    background: "#b91c1c",
                    color: "white",
                    cursor: pending ? "not-allowed" : "pointer",
                    fontWeight: 600,
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
