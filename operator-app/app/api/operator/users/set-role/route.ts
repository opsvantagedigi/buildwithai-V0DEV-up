import { NextResponse } from "next/server"
import { verifyOperatorSession } from "@/lib/operator-session"
import { logOperatorAction } from "@/lib/operator-audit"
import { setUserRole, type OperatorRole } from "@/lib/operator-auth-node"

export const runtime = "nodejs"

const validRoles: OperatorRole[] = ["admin", "operator", "auditor"]

function getClientMeta(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined
  const userAgent = request.headers.get("user-agent") || undefined
  return { ip, userAgent }
}

export async function POST(request: Request) {
  const meta = getClientMeta(request)
  const session = await verifyOperatorSession()
  if (!session) {
    await logOperatorAction({ action: "access-denied", details: "set-role without session", ...meta })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (session.role !== "admin") {
    await logOperatorAction({ action: "access-denied", actorEmail: session.email, actorRole: session.role, details: "set-role forbidden", ...meta })
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email : ""
  const role = body?.role as OperatorRole | undefined

  if (!email || !role || !validRoles.includes(role)) {
    return NextResponse.json({ error: "Email and valid role are required" }, { status: 400 })
  }

  const updated = await setUserRole(email, role)
  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  await logOperatorAction({
    action: "user-role-change",
    actorEmail: session.email,
    actorRole: session.role,
    targetEmail: updated.email,
    details: `role -> ${role}`,
    ...meta,
  })

  return NextResponse.json({ success: true })
}
