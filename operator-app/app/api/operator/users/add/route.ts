import { NextResponse } from "next/server"
import { verifyOperatorSession } from "@/lib/operator-session"
import { createUser, type OperatorRole } from "@/lib/operator-auth-node"
import { logOperatorAction } from "@/lib/operator-audit"

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
    await logOperatorAction({ action: "access-denied", details: "add-user without session", ...meta })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (session.role !== "admin") {
    await logOperatorAction({ action: "access-denied", actorEmail: session.email, actorRole: session.role, details: "add-user forbidden", ...meta })
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""
  const role = body?.role as OperatorRole | undefined

  if (!email || !password || !role || !validRoles.includes(role)) {
    return NextResponse.json({ error: "Email, password, and valid role are required" }, { status: 400 })
  }

  const created = await createUser(email, password, role)
  if (!created) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  await logOperatorAction({
    action: "user-add",
    actorEmail: session.email,
    actorRole: session.role,
    targetEmail: created.email,
    details: `role -> ${created.role}`,
    ...meta,
  })

  return NextResponse.json({ success: true })
}