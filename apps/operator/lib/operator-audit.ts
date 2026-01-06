import fs from "fs/promises"
import path from "path"
import crypto from "crypto"

export type OperatorAuditAction =
  | "login-success"
  | "login-failed"
  | "logout"
  | "user-add"
  | "user-delete"
  | "user-role-change"
  | "access-denied"
  | "view-users"

export type OperatorAuditEntry = {
  id: string
  ts: number
  actorEmail?: string
  actorRole?: string
  action: OperatorAuditAction
  targetEmail?: string
  details?: string
  ip?: string
  userAgent?: string
}

const DATA_DIR = process.env.OPERATOR_DATA_DIR || "/tmp/operator-data"
const AUDIT_STORE = path.join(DATA_DIR, "operator-audit.json")

async function ensureAuditDir() {
  await fs.mkdir(path.dirname(AUDIT_STORE), { recursive: true })
}

export async function readAudit(): Promise<OperatorAuditEntry[]> {
  try {
    await ensureAuditDir()
    const raw = await fs.readFile(AUDIT_STORE, "utf8")
    return JSON.parse(raw) as OperatorAuditEntry[]
  } catch (err) {
    return []
  }
}

export async function writeAudit(entries: OperatorAuditEntry[]): Promise<void> {
  await ensureAuditDir()
  await fs.writeFile(AUDIT_STORE, JSON.stringify(entries, null, 2), "utf8")
}

export async function logOperatorAction(entry: Omit<OperatorAuditEntry, "id" | "ts">) {
  const existing = await readAudit()
  const record: OperatorAuditEntry = {
    id: crypto.randomUUID(),
    ts: Date.now(),
    ...entry,
  }
  existing.push(record)
  await writeAudit(existing)
  return record
}
