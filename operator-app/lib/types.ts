export type AutonomyLevel = "A" | "B" | "C"

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
  risk: "low" | "medium" | "high"
  expectedImpact: string
  requiresApproval: boolean
}
