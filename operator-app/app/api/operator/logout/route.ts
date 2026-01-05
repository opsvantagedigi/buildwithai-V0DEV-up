import { NextResponse } from "next/server"
import { verifyOperatorSession } from "@/lib/operator-session"
import { logOperatorAction } from "@/lib/operator-audit"

export const runtime = "nodejs"

function getClientMeta(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined
  const userAgent = request.headers.get("user-agent") || undefined
  return { ip, userAgent }
}

export async function POST(request: Request) {
  const session = await verifyOperatorSession()
  const meta = getClientMeta(request)
  const res = NextResponse.json({ success: true })
  res.cookies.set("operator_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  if (session) {
    await logOperatorAction({ action: "logout", actorEmail: session.email, actorRole: session.role, ...meta })
  }
  return res
}
