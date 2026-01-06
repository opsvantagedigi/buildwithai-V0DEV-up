import { NextResponse } from "next/server"
import { loginOperator, createSignedSessionToken } from "@/lib/operator-auth-node"
import { logOperatorAction } from "@/lib/operator-audit"

export const runtime = "nodejs"

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const loginAttempts = new Map<string, { count: number; first: number }>()

function getClientMeta(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined
  const userAgent = request.headers.get("user-agent") || undefined
  return { ip, userAgent }
}

function normalizeKey(email: string) {
  return email.trim().toLowerCase()
}

function isRateLimited(key: string) {
  const now = Date.now()
  const entry = loginAttempts.get(key)
  if (!entry) return false
  if (now - entry.first > ATTEMPT_WINDOW_MS) {
    loginAttempts.delete(key)
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

function recordFailedAttempt(key: string) {
  const now = Date.now()
  const entry = loginAttempts.get(key)
  if (!entry || now - entry.first > ATTEMPT_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, first: now })
  } else {
    loginAttempts.set(key, { count: entry.count + 1, first: entry.first })
  }
}

function clearAttempts(key: string) {
  loginAttempts.delete(key)
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const email = body?.email as string | undefined
    const password = body?.password as string | undefined
    const meta = getClientMeta(request)

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const key = normalizeKey(email)

    if (isRateLimited(key)) {
      await logOperatorAction({ action: "access-denied", targetEmail: email, details: "login rate limited", ...meta })
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    }

    const session = await loginOperator(email, password)
    if (!session) {
      recordFailedAttempt(key)
      await logOperatorAction({ action: "login-failed", targetEmail: email, details: "invalid credentials", ...meta })
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = createSignedSessionToken(session)
    const res = NextResponse.json({ success: true })
    res.cookies.set("operator_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    clearAttempts(key)
    await logOperatorAction({ action: "login-success", actorEmail: session.email, actorRole: session.role, ...meta })
    return res
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
