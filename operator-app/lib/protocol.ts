import type {
  AuditLogEntry,
  AutonomyLevel,
  Diagnosis,
  EmailCategory,
  MonitoringEvent,
  RemediationProposal,
  RiskLevel,
} from "./types"

export type OperatorHandshakeMessage = {
  type: "operator:handshake"
  sessionId: string
  mode: "chat" | "video" | "monitor" | "fix-review" | "autonomy" | "email-settings"
  level?: AutonomyLevel
}

export type OperatorModeChangedMessage = {
  type: "operator:mode-changed"
  mode: "chat" | "video" | "monitor" | "fix-review" | "autonomy" | "email-settings"
  level?: AutonomyLevel
}

export type OperatorEventMessage = {
  type: "operator:event"
  event: string
  payload?: unknown
}

export type OperatorChatMessage = {
  type: "operator:chat"
  sessionId: string
  message: string
}

export type OperatorVideoJoinRequest = {
  type: "operator:video-join"
  sessionId: string
}

export type OperatorFixProposalMessage = {
  type: "operator:fix-proposal"
  sessionId: string
  summary: string
  steps: string[]
}

export type OperatorDiagnosisMessage = {
  type: "operator:diagnosis"
  sessionId: string
  diagnoses: Diagnosis[]
  proposals: RemediationProposal[]
}

export type OperatorFixAppliedMessage = {
  type: "operator:fix-applied"
  sessionId: string
  proposalId: string
  snapshotId?: string
  risk: RiskLevel
}

export type OperatorFixFailedMessage = {
  type: "operator:fix-failed"
  sessionId: string
  proposalId: string
  rollbackId?: string
  snapshotId?: string
  reason?: string
  risk: RiskLevel
}

export type OperatorRollbackExecutedMessage = {
  type: "operator:rollback-executed"
  sessionId: string
  rollbackId: string
  snapshotId?: string
  reason?: string
}

export type OperatorApprovalRequiredMessage = {
  type: "operator:approval-required"
  sessionId: string
  proposalId: string
  risk: RiskLevel
}

export type OperatorAutonomyStateMessage = {
  type: "operator:autonomy-state"
  sessionId: string
  level?: AutonomyLevel
  allowed: string[]
  recentLogs?: AuditLogEntry[]
}

export type OperatorMonitoringMessage = {
  type: "operator:monitoring"
  event: MonitoringEvent
}

export type OperatorEmailStatusMessage = {
  type: "operator:email-status"
  category: EmailCategory
  sent: boolean
  reason?: string
}

export type OperatorMessage =
  | OperatorHandshakeMessage
  | OperatorModeChangedMessage
  | OperatorEventMessage
  | OperatorMonitoringMessage
  | OperatorEmailStatusMessage
  | OperatorChatMessage
  | OperatorVideoJoinRequest
  | OperatorFixProposalMessage
  | OperatorDiagnosisMessage
  | OperatorFixAppliedMessage
  | OperatorFixFailedMessage
  | OperatorRollbackExecutedMessage
  | OperatorApprovalRequiredMessage
  | OperatorAutonomyStateMessage
