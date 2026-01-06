import { cookies } from "next/headers"

export type OperatorRole = "admin" | "operator" | "auditor"

export type OperatorSession = {
  email: string
  role: OperatorRole
  ts: number
}

const SESSION_COOKIE = "operator_session"
const SESSION_SECRET = process.env.OPERATOR_SESSION_SECRET || "dev-operator-session-secret"

function textToUint8(data: string) {
  return new TextEncoder().encode(data)
}

function base64UrlToUint8Array(b64url: string) {
  const pad = "=".repeat((4 - (b64url.length % 4)) % 4)
  const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function uint8ToHex(bytes: ArrayBuffer) {
  const arr = new Uint8Array(bytes)
  let hex = ""
  for (let i = 0; i < arr.length; i++) {
    hex += arr[i].toString(16).padStart(2, "0")
  }
  return hex
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey("raw", textToUint8(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
}

export async function decodeSession(token: string): Promise<OperatorSession | null> {
  const [payloadB64, signature] = token.split(".")
  if (!payloadB64 || !signature) return null

  const key = await importHmacKey(SESSION_SECRET)
  const expected = uint8ToHex(await crypto.subtle.sign("HMAC", key, textToUint8(payloadB64)))
  if (!safeEqual(signature, expected)) return null

  try {
    const payloadBytes = base64UrlToUint8Array(payloadB64)
    const json = new TextDecoder().decode(payloadBytes)
    const parsed = JSON.parse(json) as OperatorSession
    return parsed
  } catch (err) {
    return null
  }
}

export async function verifyOperatorSession(): Promise<OperatorSession | null> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  return decodeSession(token)
}

export async function getSessionRoleFromCookie(): Promise<OperatorRole | null> {
  const session = await verifyOperatorSession()
  return session?.role ?? null
}
