import { NextResponse } from "next/server"
import { verifyOperatorSession } from "@/lib/operator-session"
import { logOperatorAction } from "@/lib/operator-audit"
import { deleteUser } from "@/lib/operator-auth-node"

export const runtime = "nodejs"

function getClientMeta(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined
  const userAgent = request.headers.get("user-agent") || undefined
  return { ip, userAgent }
}

export async function POST(request: Request) {
  const meta = getClientMeta(request)
  const session = await verifyOperatorSession()
  if (!session) {
    await logOperatorAction({ action: "access-denied", details: "delete-user without session", ...meta })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (session.role !== "admin") {
    await logOperatorAction({ action: "access-denied", actorEmail: session.email, actorRole: session.role, details: "delete-user forbidden", ...meta })
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email : ""

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const deleted = await deleteUser(email)
  if (!deleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  await logOperatorAction({
    action: "user-delete",
    actorEmail: session.email,
    actorRole: session.role,
    targetEmail: email,
    ...meta,
  })

  return NextResponse.json({ success: true })
}
