export type AutonomyLevel = "A" | "B" | "C"

export type RiskLevel = "low" | "medium" | "high"

export type EmailCategory =
  | "fix-applied"
  | "fix-failed"
  | "rollback-executed"
  | "approval-required"
  | "high-risk-blocked"
  | "daily-summary"
  | "critical-monitoring"

export interface EmailNotificationResult {
  sent: boolean
  messageId?: string
  reason?: string
}

export interface ChatMessage {
  from: "user" | "operator"
  text: string
}

export interface MonitoringEvent {
  id: string
  timestamp: string
  source: string
  severity: "info" | "warning" | "error" | "critical"
  kind: "uptime" | "error" | "latency" | "content" | "custom"
  message: string
  context?: Record<string, unknown>
}

export interface Diagnosis {
  id: string
  eventId: string
  summary: string
  evidence: string[]
  suspectedCauses: string[]
  confidence: number
  severity?: MonitoringEvent["severity"]
  risk?: RiskLevel
  occurrenceCount?: number
  historyScore?: number
  historicallyFragile?: boolean
  historicallyReliable?: boolean
  hotspot?: boolean
}

export interface RemediationStep {
  description: string
  impactArea?: string
  estimatedDurationMinutes?: number
}

export interface RemediationProposal {
  id: string
  diagnosisId: string
  steps: RemediationStep[]
  risk: RiskLevel
  expectedImpact: string
  requiresApproval: boolean
  historicalSuccessRate?: number
  historicalFailureRate?: number
  timesApplied?: number
  timesRolledBack?: number
  historyNote?: string
}

export interface RollbackPlan {
  id: string
  steps: string[]
  verificationCriteria: string[]
  expectedState: string
}

export interface Snapshot {
  id: string
  timestamp: string
  reason: string
  diffSummary: string
  affectedFiles: string[]
  riskLevel: RiskLevel
}

export type AuditActionType =
  | "fix-applied"
  | "fix-failed"
  | "rollback-executed"
  | "approval-required"
  | "fix-rejected"
  | "email-sent"
  | "email-failed"

export interface IncidentRecord {
  id: string
  timestamp: string
  source?: string
  summary?: string
  eventId?: string
  snapshotId?: string
  diagnosisId?: string
  proposalId?: string
  rollbackId?: string
  risk?: RiskLevel
  severity?: MonitoringEvent["severity"]
  kind?: MonitoringEvent["kind"]
  actionType?: AuditActionType
  message?: string
  tags?: string[]
  tenantId?: string
  siteId?: string
}

export interface IncidentPattern {
  key: string
  type: "diagnosis" | "source" | "proposal"
  occurrences: number
  lastSeenAt: string
  relatedDiagnosisIds?: string[]
  relatedProposalIds?: string[]
  successCount?: number
  failureCount?: number
  rollbackCount?: number
  approvalCount?: number
  tenantId?: string
  siteId?: string
}

export interface IncidentSummary {
  totalIncidents: number
  fixSuccessCount: number
  fixFailureCount: number
  rollbackCount: number
  highRiskBlockedCount: number
  approvalsRequiredCount?: number
  emailsSentCount?: number
  emailsFailedCount?: number
  topPatterns: IncidentPattern[]
}

export interface PredictiveFixSuggestion {
  id: string
  diagnosisId?: string
  patternKey?: string
  confidence: number
  summary: string
  suggestedSteps: RemediationStep[]
  risk?: RiskLevel
  rationale?: string
  basedOnIncidents?: string[]
}

export interface KnowledgeArticle {
  id: string
  title: string
  summary: string
  relatedDiagnosisIds?: string[]
  relatedProposalIds?: string[]
  relatedPatternKeys?: string[]
  createdAt: string
  updatedAt: string
  source: "operator" | "human"
  tags?: string[]
  body: string
  tenantId?: string
  siteId?: string
}

export interface PlaybookStep {
  order: number
  description: string
  expectedOutcome?: string
}

export interface Playbook {
  id: string
  name: string
  description: string
  triggers?: {
    patternKey?: string
    diagnosisSummaryContains?: string
    pathContains?: string
  }
  steps: PlaybookStep[]
  createdAt: string
  updatedAt: string
  tenantId?: string
  siteId?: string
}

export interface OperatorPersona {
  name: string
  tone: "concise" | "teaching" | "reassuring"
  brandNotes?: string[]
  signatureLine?: string
}

export interface VoiceSummary {
  title: string
  bullets: string[]
  recommendedActions?: string[]
  timeframe?: string
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  actionType: AuditActionType
  risk: RiskLevel
  diagnosisId?: string
  proposalId?: string
  rollbackId?: string
  snapshotId?: string
  verificationResult?: "passed" | "failed"
  message?: string
}

export interface FixExecutionResult {
  status: "applied" | "pending-approval" | "rejected" | "rolled-back"
  risk: RiskLevel
  snapshotId?: string
  rollbackId?: string
  logId?: string
  verificationPassed?: boolean
  message: string
}
