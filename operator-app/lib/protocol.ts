import type { AutonomyLevel, MonitoringEvent } from "./types"

export type OperatorHandshakeMessage = {
  type: "operator:handshake"
  sessionId: string
  mode: "chat" | "video"
}

export type OperatorModeChangedMessage = {
  type: "operator:mode-changed"
  mode: "chat" | "video"
  level?: AutonomyLevel
}

export type OperatorEventMessage = {
  type: "operator:event"
  event: string
  payload?: unknown
}

export type OperatorMonitoringMessage = {
  type: "operator:monitoring"
  event: MonitoringEvent
}

export type OperatorMessage =
  | OperatorHandshakeMessage
  | OperatorModeChangedMessage
  | OperatorEventMessage
  | OperatorMonitoringMessage
