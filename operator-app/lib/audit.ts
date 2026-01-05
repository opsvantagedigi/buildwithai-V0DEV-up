import type { AuditActionType, AuditLogEntry, RiskLevel } from "@/lib/types"

const auditLog: AuditLogEntry[] = []

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function logAction(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  const next: AuditLogEntry = {
    ...entry,
    id: makeId("audit"),
    timestamp: new Date().toISOString(),
  }
  auditLog.push(next)
  return next
}

export function listLogs(): AuditLogEntry[] {
  return [...auditLog].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
}

export function filterLogs(options: { risk?: RiskLevel; actionType?: AuditActionType } = {}): AuditLogEntry[] {
  return listLogs().filter((log) => {
    if (options.risk && log.risk !== options.risk) return false
    if (options.actionType && log.actionType !== options.actionType) return false
    return true
  })
}
