import { listLogs } from "@/lib/audit"
import type {
  AuditLogEntry,
  Diagnosis,
  IncidentPattern,
  IncidentRecord,
  IncidentSummary,
  MonitoringEvent,
  RemediationProposal,
} from "@/lib/types"

const incidentStore: IncidentRecord[] = []
const MAX_INCIDENTS = 1000

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

function normalizeSource(event?: MonitoringEvent) {
  return event?.context && typeof event.context.path === "string" ? String(event.context.path) : event?.source
}

function toIncidentFromAudit(log: AuditLogEntry): IncidentRecord {
  return {
    id: log.id,
    timestamp: log.timestamp,
    diagnosisId: log.diagnosisId,
    proposalId: log.proposalId,
    rollbackId: log.rollbackId,
    snapshotId: log.snapshotId,
    risk: log.risk,
    actionType: log.actionType,
    message: log.message,
  }
}

export function recordIncident(record: AuditLogEntry | Partial<IncidentRecord>) {
  const entry: IncidentRecord = {
    id: "id" in record && record.id ? record.id : makeId("incident"),
    timestamp: record.timestamp ?? new Date().toISOString(),
    source: "source" in record ? record.source : undefined,
    summary: "summary" in record ? record.summary : undefined,
    eventId: "eventId" in record ? record.eventId : undefined,
    snapshotId: "snapshotId" in record ? record.snapshotId : undefined,
    diagnosisId: "diagnosisId" in record ? record.diagnosisId : undefined,
    proposalId: "proposalId" in record ? record.proposalId : undefined,
    rollbackId: "rollbackId" in record ? record.rollbackId : undefined,
    risk: record.risk,
    severity: "severity" in record ? record.severity : undefined,
    kind: "kind" in record ? record.kind : undefined,
    actionType: "actionType" in record ? record.actionType : undefined,
    message: "message" in record ? record.message : undefined,
    tags: "tags" in record && record.tags ? record.tags : [],
  }

  incidentStore.push(entry)
  if (incidentStore.length > MAX_INCIDENTS) {
    incidentStore.splice(0, incidentStore.length - MAX_INCIDENTS)
  }
  return entry
}

function mergeIncidents(store: IncidentRecord[], logs: IncidentRecord[]): IncidentRecord[] {
  const map = new Map<string, IncidentRecord>()
  ;[...store, ...logs].forEach((inc) => {
    if (!map.has(inc.id)) {
      map.set(inc.id, inc)
    }
  })
  return Array.from(map.values())
}

function allIncidents(): IncidentRecord[] {
  const logIncidents = listLogs().map(toIncidentFromAudit)
  const combined = mergeIncidents(incidentStore, logIncidents)
  combined.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
  return combined
}

export function getRecentIncidents(limit = 100): IncidentRecord[] {
  return allIncidents().slice(0, limit)
}

export function deriveIncidentPatterns(records: IncidentRecord[], limit = 20): IncidentPattern[] {
  const patterns: Record<string, IncidentPattern> = {}

  const addPattern = (
    key: string,
    type: IncidentPattern["type"],
    record: IncidentRecord,
    updater?: (p: IncidentPattern, rec: IncidentRecord) => void,
  ) => {
    if (!key) return
    const mapKey = `${type}:${key}`
    const existing = patterns[mapKey] ?? {
      key,
      type,
      occurrences: 0,
      lastSeenAt: record.timestamp,
      relatedDiagnosisIds: [],
      relatedProposalIds: [],
    }

    existing.occurrences += 1
    if (record.timestamp > existing.lastSeenAt) existing.lastSeenAt = record.timestamp
    if (record.diagnosisId && !existing.relatedDiagnosisIds?.includes(record.diagnosisId)) {
      existing.relatedDiagnosisIds = [...(existing.relatedDiagnosisIds ?? []), record.diagnosisId]
    }
    if (record.proposalId && !existing.relatedProposalIds?.includes(record.proposalId)) {
      existing.relatedProposalIds = [...(existing.relatedProposalIds ?? []), record.proposalId]
    }
    if (updater) updater(existing, record)
    patterns[mapKey] = existing
  }

  records.forEach((rec) => {
    if (rec.summary) addPattern(rec.summary, "diagnosis", rec)
    if (rec.source) addPattern(rec.source, "source", rec)
    if (rec.proposalId) {
      addPattern(rec.proposalId, "proposal", rec, (p, r) => {
        if (r.actionType === "fix-applied") p.successCount = (p.successCount ?? 0) + 1
        if (r.actionType === "fix-failed") p.failureCount = (p.failureCount ?? 0) + 1
        if (r.actionType === "rollback-executed") p.rollbackCount = (p.rollbackCount ?? 0) + 1
        if (r.actionType === "approval-required") p.approvalCount = (p.approvalCount ?? 0) + 1
      })
    }
  })

  return Object.values(patterns)
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, limit)
}

export function getIncidentPatterns(limit = 20): IncidentPattern[] {
  return deriveIncidentPatterns(allIncidents(), limit)
}

export function summarizeIncidents(records: IncidentRecord[]): IncidentSummary {
  const summary: IncidentSummary = {
    totalIncidents: records.length,
    fixSuccessCount: 0,
    fixFailureCount: 0,
    rollbackCount: 0,
    highRiskBlockedCount: 0,
    approvalsRequiredCount: 0,
    emailsSentCount: 0,
    emailsFailedCount: 0,
    topPatterns: [],
  }

  records.forEach((rec) => {
    if (rec.actionType === "fix-applied") summary.fixSuccessCount += 1
    if (rec.actionType === "fix-failed") summary.fixFailureCount += 1
    if (rec.actionType === "rollback-executed") summary.rollbackCount += 1
    if (rec.actionType === "fix-rejected") summary.highRiskBlockedCount += 1
    if (rec.actionType === "approval-required") summary.approvalsRequiredCount = (summary.approvalsRequiredCount ?? 0) + 1
    if (rec.actionType === "email-sent") summary.emailsSentCount = (summary.emailsSentCount ?? 0) + 1
    if (rec.actionType === "email-failed") summary.emailsFailedCount = (summary.emailsFailedCount ?? 0) + 1
  })

  summary.topPatterns = deriveIncidentPatterns(records, 5)
  return summary
}

export function summarizeIncidentHistory(): IncidentSummary {
  return summarizeIncidents(allIncidents())
}

export function detectAnomalies(events: MonitoringEvent[]): { anomalies: MonitoringEvent[]; summary: string } {
  if (!events.length) return { anomalies: [], summary: "No events provided." }

  const errors = events.filter((e) => e.severity === "error" || e.severity === "critical")
  const latency = events.filter((e) => e.kind === "latency")
  const uptimeIssues = events.filter((e) => e.kind === "uptime")

  const anomalies: MonitoringEvent[] = []
  const notes: string[] = []

  if (errors.length >= 3 || errors.length >= Math.max(2, Math.ceil(events.length / 2))) {
    anomalies.push(...errors)
    notes.push(`Spike in errors/critical events (${errors.length})`)
  }

  const latencySources = new Set(latency.map((l) => normalizeSource(l)))
  if (latency.length >= 3 || latencySources.size >= 2) {
    anomalies.push(...latency)
    notes.push("Elevated latency across multiple events")
  }

  const uptimeBySource: Record<string, number> = {}
  uptimeIssues.forEach((u) => {
    const src = normalizeSource(u)
    if (!src) return
    uptimeBySource[src] = (uptimeBySource[src] ?? 0) + 1
  })
  Object.entries(uptimeBySource).forEach(([src, count]) => {
    if (count >= 2) {
      anomalies.push(...uptimeIssues.filter((u) => normalizeSource(u) === src))
      notes.push(`Repeated uptime issues for ${src}`)
    }
  })

  const summary = notes.length ? notes.join("; ") : "No anomalies detected."
  return { anomalies: Array.from(new Set(anomalies)), summary }
}

export function getIncidentHotspots(limit = 10) {
  return getIncidentPatterns(limit)
}

export function summarizeIncidentHistoryForDiagnostics(diagnoses: Diagnosis[]) {
  const recent = getRecentIncidents(300)
  const summaryByDiag: Record<string, { occurrences: number; failures: number; successes: number }> = {}

  diagnoses.forEach((diag) => {
    const matches = recent.filter(
      (rec) =>
        rec.diagnosisId === diag.id ||
        rec.summary === diag.summary ||
        (rec.eventId && rec.eventId === diag.eventId) ||
        (rec.source && diag.summary.includes(rec.source ?? "")),
    )

    if (!matches.length) return
    const successes = matches.filter((m) => m.actionType === "fix-applied").length
    const failures = matches.filter((m) => m.actionType === "fix-failed").length

    summaryByDiag[diag.id] = {
      occurrences: matches.length,
      failures,
      successes,
    }
  })

  return summaryByDiag
}

export function summarizeProposalHistory(proposals: RemediationProposal[]) {
  const recent = getRecentIncidents(400)
  const map: Record<string, { attempts: number; successes: number; failures: number; rollbacks: number }> = {}

  proposals.forEach((proposal) => {
    const matches = recent.filter((rec) => rec.proposalId === proposal.id || rec.diagnosisId === proposal.diagnosisId)
    if (!matches.length) return

    const successes = matches.filter((m) => m.actionType === "fix-applied").length
    const failures = matches.filter((m) => m.actionType === "fix-failed").length
    const rollbacks = matches.filter((m) => m.actionType === "rollback-executed").length

    map[proposal.id] = {
      attempts: matches.length,
      successes,
      failures,
      rollbacks,
    }
  })

  return map
}

export function getRecentPatterns(limit = 10) {
  return getIncidentPatterns(limit)
}

export function summarizeIncidentHistoryForSources(events: MonitoringEvent[]) {
  const sourceCounts: Record<string, number> = {}
  events.forEach((evt) => {
    const src = normalizeSource(evt)
    if (src) sourceCounts[src] = (sourceCounts[src] ?? 0) + 1
  })
  return sourceCounts
}
