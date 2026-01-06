import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { verifyOperatorSession } from "@/lib/operator-session"
import { readUsers } from "@/lib/operator-auth-node"
import { logOperatorAction } from "@/lib/operator-audit"
import OperatorUsersTable from "@/components/OperatorUsersTable"

export const runtime = "nodejs"

export default async function OperatorUsersPage() {
  const hdrs = await headers()
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || undefined
  const userAgent = hdrs.get("user-agent") || undefined
  const session = await verifyOperatorSession()
  if (!session) {
    await logOperatorAction({ action: "access-denied", details: "users page unauthenticated", ip, userAgent })
    redirect("/operator-login")
  }
  if (session.role !== "admin") {
    await logOperatorAction({ action: "access-denied", actorEmail: session.email, actorRole: session.role, details: "users page forbidden", ip, userAgent })
    redirect("/operator/not-authorized")
  }

  const users = await readUsers()
  await logOperatorAction({ action: "view-users", actorEmail: session.email, actorRole: session.role, ip, userAgent })

  return (
    <main style={{ minHeight: "100vh", background: "#040711", padding: 16, color: "#e5e7eb" }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Operator Users</h1>
      <OperatorUsersTable users={users} />
    </main>
  )
}
