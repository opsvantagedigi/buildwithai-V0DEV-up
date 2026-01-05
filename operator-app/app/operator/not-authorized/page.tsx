import { verifyOperatorSession } from "@/lib/operator-session"
import Link from "next/link"

export const runtime = "nodejs"

export default async function NotAuthorizedPage() {
  const session = await verifyOperatorSession()

  return (
    <main style={{ minHeight: "100vh", background: "#0b1224", color: "#e5e7eb", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, textAlign: "center", display: "grid", gap: 12 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>Not Authorized</h1>
        {session ? (
          <p style={{ margin: 0 }}>
            You are signed in as {session.email} ({session.role}), but you are not authorized to access this area.
          </p>
        ) : (
          <p style={{ margin: 0 }}>You are not authorized to access this area.</p>
        )}
        <div>
          <Link
            href="/operator"
            style={{
              display: "inline-block",
              padding: "10px 16px",
              borderRadius: 10,
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Go to Operator Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
