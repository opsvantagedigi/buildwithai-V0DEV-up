// Monitoring and autonomy model for the AI Operator.

/**
 * Operator autonomy level:
 * - "A": Observe only.
 * - "B": Diagnose and propose fixes (current mode).
 * - "C": Autonomous remediation with rollback and audit (future).
 */
export type AutonomyLevel = "A" | "B" | "C"

/**
 * A single monitoring signal from the platform or an integrated system.
 */
export interface MonitoringEvent {
  /** Stable identifier for this event. */
  id: string
  /** ISO 8601 timestamp for when the event occurred. */
  timestamp: string
  /** Logical source of the event, such as a service, route, or subsystem. */
  source: string
  /** Severity of the event. */
  severity: "info" | "warning" | "error" | "critical"
  /** Category of signal emitted. */
  kind: "uptime" | "error" | "latency" | "content" | "custom"
  /** Human-readable summary of what happened. */
  message: string
  /** Optional structured context for deeper analysis. */
  context?: Record<string, unknown>
}

/**
 * The Operator's interpretation of a monitoring event or cluster of events.
 */
export interface Diagnosis {
  /** Stable identifier for this diagnosis. */
  id: string
  /** The primary event that triggered this diagnosis. */
  eventId: string
  /** Short summary of what the Operator believes is happening. */
  summary: string
  /** Evidence supporting this diagnosis (logs, metrics, traces, etc.). */
  evidence: string[]
  /** Likely root causes or contributing factors. */
  suspectedCauses: string[]
  /** Confidence score between 0 and 1. */
  confidence: number
}

/**
 * A single concrete action the Operator could take to remediate an issue.
 */
export interface RemediationStep {
  /** Description of the step the Operator would perform. */
  description: string
  /** Optional label for the area impacted by this step. */
  impactArea?: string
  /** Optional estimate of how long this step might take in minutes. */
  estimatedDurationMinutes?: number
}

/**
 * A proposed remediation plan derived from a diagnosis.
 */
export interface RemediationProposal {
  /** Stable identifier for this proposal. */
  id: string
  /** The diagnosis this proposal is linked to. */
  diagnosisId: string
  /** Step-by-step actions the Operator recommends. */
  steps: RemediationStep[]
  /** Estimated risk of applying this proposal. */
  risk: "low" | "medium" | "high"
  /** Expected impact or outcome if applied. */
  expectedImpact: string
  /** Whether human approval is required before execution. */
  requiresApproval: boolean
}

/**
 * A plan for safely undoing or rolling back changes if a remediation goes wrong.
 */
export interface RollbackPlan {
  /** Specific steps to restore the previous known-good state. */
  steps: string[]
  /** Optional checkpoints where state should be validated. */
  checkpoints?: string[]
  /** Conditions that should immediately abort the rollout or rollback. */
  abortConditions?: string[]
  /** Optional rough estimate of how long rollback might take in minutes. */
  estimatedTimeMinutes?: number
}

/**
 * Captures the current autonomy mode and relevant notes for the Operator.
 */
export interface OperatorModeState {
  /** Current autonomy level for the Operator. */
  level: AutonomyLevel
  /** ISO timestamp for when this mode became effective. */
  effectiveSince: string
  /** Optional notes that capture rationale or guardrails. */
  notes?: string
}

/**
 * Current Operator mode:
 * - Mode B: Diagnose and propose fixes with human approval.
 */
export const CURRENT_OPERATOR_MODE: OperatorModeState = {
  level: "B",
  effectiveSince: "2025-01-01T00:00:00.000Z",
  notes:
    "Operator is in Mode B: observes, diagnoses, and proposes fixes, but does not apply changes autonomously.",
}

/*
Operator App (App 2) integration contract (conceptual)

Responsibilities
- Hosts the Operator UI (chat, tools, future video experiences).
- Exposes monitoring and diagnosis APIs.
- Provides embeddable surfaces via GET /embed and GET /widget.js.

Monitoring API shape (conceptual)
- POST /api/monitoring/events
  Body: { events: MonitoringEvent[] } or MonitoringEvent[]
- POST /api/monitoring/diagnose
  Body: { events: MonitoringEvent[] }
  Response: { diagnoses: Diagnosis[]; proposals: RemediationProposal[] }

Embed endpoints (conceptual)
- GET /embed?sessionId=...&mode=chat|video
  Returns an iframe-friendly HTML shell that renders the Operator UI.
- GET /widget.js
  Lightweight script that injects a container and embeds an iframe pointing to /embed (for future external use).

Message protocol (postMessage, conceptual)
- OperatorHandshakeMessage: { type: "operator:handshake"; sessionId: string; mode: "chat" | "video" }
- OperatorModeChangedMessage: { type: "operator:mode-changed"; mode: "chat" | "video" }
- OperatorEventMessage: { type: "operator:event"; event: string; payload?: unknown }
- OperatorMonitoringMessage: { type: "operator:monitoring"; event: MonitoringEvent }
App 1 hosts the iframe; App 2 runs inside it. Enforce origin checks and sandbox attributes.
*/
