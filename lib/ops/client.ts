"use client"

import type { Diagnosis, MonitoringEvent, RemediationProposal } from "./model"

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

export async function requestDiagnosis(
  events: MonitoringEvent[],
): Promise<{ diagnoses: Diagnosis[]; proposals: RemediationProposal[] } | null> {
  if (typeof window === "undefined") return null

  try {
    const res = await fetch(`${OPERATOR_MONITORING_URL}/diagnose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
    })

    if (!res.ok) {
      console.error("Failed to request diagnosis", res.status, res.statusText)
      return null
    }

    const data = (await res.json()) as {
      diagnoses: Diagnosis[]
      proposals: RemediationProposal[]
    }

    return data
  } catch (error) {
    console.error("Error while requesting diagnosis", error)
    return null
  }
}
