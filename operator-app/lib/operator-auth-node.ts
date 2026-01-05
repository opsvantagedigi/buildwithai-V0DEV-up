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

export type OperatorSessionPayload = {
  email: string
  role: OperatorRole
  ts: number
}

const USER_STORE = path.join(process.cwd(), "data", "operator-users.json")
const SESSION_SECRET = process.env.OPERATOR_SESSION_SECRET || "dev-operator-session-secret"

async function ensureUserStoreDir() {
  await fs.mkdir(path.dirname(USER_STORE), { recursive: true })
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function readUsers(): Promise<OperatorUser[]> {
  try {
    await ensureUserStoreDir()
    const raw = await fs.readFile(USER_STORE, "utf8")
    return JSON.parse(raw) as OperatorUser[]
  } catch (err) {
    return []
  }
}

export async function writeUsers(users: OperatorUser[]): Promise<void> {
  await ensureUserStoreDir()
  await fs.writeFile(USER_STORE, JSON.stringify(users, null, 2), "utf8")
}

export async function findUser(email: string) {
  const users = await readUsers()
  const key = normalizeEmail(email)
  return users.find((u) => normalizeEmail(u.email) === key)
}

export async function setUserRole(email: string, role: OperatorRole): Promise<OperatorUser | null> {
  const users = await readUsers()
  const key = normalizeEmail(email)
  const idx = users.findIndex((u) => normalizeEmail(u.email) === key)
  if (idx === -1) return null
  const updated: OperatorUser = { ...users[idx], role }
  users[idx] = updated
  await writeUsers(users)
  return updated
}

export async function deleteUser(email: string): Promise<boolean> {
  const users = await readUsers()
  const key = normalizeEmail(email)
  const idx = users.findIndex((u) => normalizeEmail(u.email) === key)
  if (idx === -1) return false
  users.splice(idx, 1)
  await writeUsers(users)
  return true
}

export async function loginOperator(email: string, password: string): Promise<OperatorSessionPayload | null> {
  const user = await findUser(email)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return null
  return { email: user.email, role: user.role, ts: Date.now() }
}

export function createSignedSessionToken(payload: OperatorSessionPayload) {
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("hex")
  return `${payloadB64}.${signature}`
}
