import { NextResponse } from "next/server"
import { loginOperator } from "@/lib/operator-auth"

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const loginAttempts = new Map<string, { count: number; first: number }>()

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

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const key = normalizeKey(email)

    if (isRateLimited(key)) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    }

    const ok = await loginOperator(email, password)
    if (!ok) {
      recordFailedAttempt(key)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    clearAttempts(key)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
