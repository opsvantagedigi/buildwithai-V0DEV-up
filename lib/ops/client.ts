"use client"

import type { MonitoringEvent } from "./model"

const OPERATOR_MONITORING_URL =
  process.env.NEXT_PUBLIC_OPERATOR_MONITORING_URL ??
  "https://operator.buildwithai.digital/api/monitoring"

export async function sendMonitoringEvents(events: MonitoringEvent[]): Promise<void> {
  if (typeof window === "undefined") return

  try {
    await fetch(`${OPERATOR_MONITORING_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
    })
  } catch (error) {
    console.error("Failed to send monitoring events", error)
  }
}
