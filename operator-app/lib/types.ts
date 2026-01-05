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
  focus?: "stability" | "learning" | "speed"
  prefersBullets?: boolean
}

export interface SimpleTrend {
  label: string
  direction: "up" | "down" | "flat"
  confidence: number
}

export interface CognitionConfidence {
  id?: string
  target: "diagnosis" | "proposal" | "prediction" | "warning"
  score: number
  rationale: string
}

export interface CognitionRationale {
  summary: string
  factors: string[]
}

export interface CognitionTrace {
  steps: string[]
  conclusion: string
}

export interface CognitiveDriftReport {
  status: "stable" | "watch" | "drifting"
  indicators: string[]
  driftScore: number
}

export interface CognitiveStabilityScore {
  score: number
  factors: string[]
}

export interface PrimeCognitionBundle {
  confidences: CognitionConfidence[]
  rationales: CognitionRationale[]
  traces: CognitionTrace[]
  drift: CognitiveDriftReport
  stability: CognitiveStabilityScore
}

export interface StabilityIndex {
  score: number
  level: "calm" | "watch" | "critical"
  factors: string[]
  computedAt: string
}

export interface EarlyWarning {
  id: string
  title: string
  severity: RiskLevel
  rationale: string
  actions: string[]
  window: "immediate" | "short-term" | "mid-term"
  source: "foresight" | "prime" | "reflection"
}

export interface ForesightPrediction {
  id: string
  likelihood: number
  impact: RiskLevel
  summary: string
  drivers: string[]
  horizon: "short" | "mid" | "long"
}

export interface AutonomySimulation {
  id: string
  description: string
  risk: RiskLevel
  outcome: "pass" | "fail" | "uncertain"
  steps: string[]
  approvalsNeeded?: number
}

export interface FixStrategyScore {
  strategy: string
  score: number
  rationale: string
}

export interface ReliabilityForecast {
  score: number
  horizon: "short" | "mid" | "long"
  rationale: string[]
}

export interface PrimeInsight {
  id: string
  title: string
  narrative: string
  reliabilityScore: number
  scope: "global" | "tenant" | "site"
}

export interface PrimeBriefing {
  headline: string
  highlights: string[]
  reliabilityScore: number
}

export interface ReflectionSummary {
  period: "daily" | "weekly" | "monthly" | "subsystem"
  highlights: string[]
  risks: string[]
  recommendations: string[]
}

export interface PrimeNarrativeBundle {
  headline: string
  weekly: string[]
  monthly: string[]
  feed: string[]
  briefing: string[]
}

export interface KnowledgeLink {
  from: string
  to: string
  relation: string
}

export interface KnowledgeRecommendation {
  title: string
  summary: string
  actions: string[]
}

export interface KnowledgeGraph {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  proposals: RemediationProposal[]
  playbooks: Playbook[]
  articles: KnowledgeArticle[]
  links: KnowledgeLink[]
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
