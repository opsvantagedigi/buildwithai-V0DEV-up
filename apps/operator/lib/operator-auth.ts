import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export type OperatorRole = "admin" | "operator" | "auditor"

export type OperatorUser = {
  email: string
  passwordHash: string
  role: OperatorRole
  createdAt: string
}

export type OperatorSession = {
  email: string
  role: OperatorRole
  ts: number
}

const USER_STORE = path.join(process.cwd(), "data", "operator-users.json")
const SESSION_COOKIE = "operator_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24
const SESSION_SECRET = process.env.OPERATOR_SESSION_SECRET || "dev-operator-session-secret"

async function readUsers(): Promise<OperatorUser[]> {
  try {
    const raw = await fs.readFile(USER_STORE, "utf8")
    return JSON.parse(raw) as OperatorUser[]
  } catch (err) {
    return []
  }
}

async function findUser(email: string) {
  const users = await readUsers()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function signPayload(payload: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex")
}

function buildToken(session: OperatorSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url")
  const signature = signPayload(payload)
  return `${payload}.${signature}`
}

export function verifyToken(token: string): OperatorSession | null {
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  const expected = signPayload(payload)
  if (signature.length !== expected.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as OperatorSession
    return session
  } catch (err) {
    return null
  }
}

export async function loginOperator(email: string, password: string): Promise<boolean> {
  const user = await findUser(email)
  if (!user) return false
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return false
  const session: OperatorSession = { email: user.email, role: user.role, ts: Date.now() }
  await setSessionCookie(session)
  return true
}

export async function verifyOperatorSession(): Promise<OperatorSession | null> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

async function setSessionCookie(session: OperatorSession) {
  const jar = await cookies()
  const token = buildToken(session)
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearOperatorSession() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export async function requireOperatorAuth(requiredRole?: OperatorRole) {
  const session = await verifyOperatorSession()
  if (!session) {
    redirect("/operator-login")
  }
  if (requiredRole && session.role !== requiredRole) {
    redirect("/operator-login")
  }
}

export async function getSessionRoleFromCookie(): Promise<OperatorRole | null> {
  const session = await verifyOperatorSession()
  return session?.role ?? null
}
