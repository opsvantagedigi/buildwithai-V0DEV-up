"use client"

import type { AutonomyLevel } from "@/lib/types"

const envVars = [
  "MAILCOW_SMTP_HOST",
  "MAILCOW_SMTP_PORT",
  "MAILCOW_SMTP_USER",
  "MAILCOW_SMTP_PASS",
  "MAILCOW_SMTP_FROM",
  "MAILCOW_ALERT_RECIPIENTS",
]

type EmailSettingsPanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function EmailSettingsPanel({ sessionId, level }: EmailSettingsPanelProps) {
  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Email Settings</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>
        Session {sessionId} · Mode {level ?? "unspecified"}
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Configure Mailcow SMTP variables for notifications. No third-party SaaS is used.
      </p>

      <section style={{ background: "#0f172a", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Required environment variables</h3>
        <ul style={{ margin: 0, paddingLeft: 16, color: "#e5e7eb", fontSize: 13 }}>
          {envVars.map((env) => (
            <li key={env}>{env}</li>
          ))}
        </ul>
      </section>

      <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Notes</h3>
        <ul style={{ margin: 0, paddingLeft: 16, color: "#e5e7eb", fontSize: 13 }}>
          <li>High-risk fixes are blocked and only send alert emails; they never auto-run.</li>
          <li>Approval-required fixes send an alert; execution still requires consent.</li>
          <li>Critical monitoring events and daily summaries send to alert recipients.</li>
        </ul>
      </section>
    </div>
  )
}
