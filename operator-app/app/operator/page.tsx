import IntelligencePanel from "@/components/IntelligencePanel"
import OperatorTopBar from "@/components/OperatorTopBar"
import { redirect } from "next/navigation"
import { verifyOperatorSession } from "@/lib/operator-session"

export default async function OperatorPage() {
  const session = await verifyOperatorSession()
  if (!session) {
    redirect("/operator-login")
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1f46 0%, #0a3c52 40%, #0b4a2e 70%, #b58b00 100%)",
        padding: "20px",
        color: "#e5e7eb",
        fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gap: 16 }}>
        <OperatorTopBar email={session.email} role={session.role} />

        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: 16,
            borderRadius: 14,
            background: "rgba(7,12,26,0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 16px 50px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              aria-hidden
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1e3a8a, #0ea5e9)",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontFamily: "Orbitron, 'Segoe UI', system-ui, sans-serif",
                letterSpacing: 1,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {session.email?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#cbd5e1",
                  fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
                }}
              >
                Welcome back
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontFamily: "Orbitron, 'Segoe UI', system-ui, sans-serif",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Operator Intelligence
              </h1>
              <div
                style={{
                  marginTop: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(14,165,233,0.16)",
                  color: "#93c5fd",
                  fontSize: 12,
                  border: "1px solid rgba(148,163,184,0.3)",
                }}
              >
                <span style={{ fontWeight: 700 }}>{session.role.toUpperCase()}</span>
                <span style={{ color: "#cbd5e1" }}>{session.email}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #1d4ed8",
                background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
                fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              }}
            >
              View Logs
            </button>
            <button
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #f59e0b",
                background: "linear-gradient(135deg, #f59e0b, #facc15)",
                color: "#0f172a",
                cursor: "pointer",
                fontWeight: 700,
                fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              }}
            >
              Trigger Rollback
            </button>
            <button
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #10b981",
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                color: "#0b1224",
                cursor: "pointer",
                fontWeight: 700,
                fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
              }}
            >
              Acknowledge Warning
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            alignItems: "stretch",
          }}
        >
          <div style={cardStyle}>
            <div style={cardHeader}>Users Database</div>
            <div style={metricRow}>
              <div style={metricBlock} title="Total operator accounts">
                <span style={metricLabel}>Users</span>
                <span style={metricValue}>12</span>
              </div>
              <div style={metricBlock} title="Admin / Operator / Auditor split">
                <span style={metricLabel}>Roles</span>
                <span style={metricValue}>3 types</span>
              </div>
            </div>
            <a href="/operator/users" style={ctaLink}>Manage Users →</a>
          </div>

          <div style={cardStyle}>
            <div style={cardHeader}>Subscriptions Management</div>
            <div style={metricRow}>
              <div style={metricBlock} title="Active subscription plans">
                <span style={metricLabel}>Active</span>
                <span style={metricValue}>48</span>
              </div>
              <div style={metricBlock} title="Renewals scheduled this month">
                <span style={metricLabel}>Renewals</span>
                <span style={metricValue}>17</span>
              </div>
              <div style={metricBlock} title="Churn this quarter">
                <span style={metricLabel}>Churn</span>
                <span style={metricValue}>3.1%</span>
              </div>
            </div>
            <p style={cardNote}>Automate lifecycle events and dunning here.</p>
          </div>

          <div style={cardStyle}>
            <div style={cardHeader}>Sales Revenue</div>
            <div style={metricRow}>
              <div style={metricBlock} title="Monthly recurring revenue">
                <span style={metricLabel}>MRR</span>
                <span style={metricValue}>$142k</span>
              </div>
              <div style={metricBlock} title="Annual recurring revenue">
                <span style={metricLabel}>ARR</span>
                <span style={metricValue}>$1.7M</span>
              </div>
              <div style={metricBlock} title="Latest settled transactions">
                <span style={metricLabel}>Recent</span>
                <span style={metricValue}>12 tx</span>
              </div>
            </div>
            <p style={cardNote}>Pipeline synced daily with finance systems.</p>
          </div>

          <div style={cardStyle}>
            <div style={cardHeader}>Report Generation</div>
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14 }}>Build export packs for compliance, SOC, and executive briefings.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <button style={ghostButton}>Generate Report</button>
              <button style={ghostButton}>Export Options</button>
            </div>
          </div>
        </section>

        <section style={{ background: "rgba(7,12,26,0.82)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 16 }}>
          <IntelligencePanel sessionId="operator" />
        </section>
      </div>
    </main>
  )
}

const cardStyle: React.CSSProperties = {
  background: "rgba(7,12,26,0.82)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 12px 38px rgba(0,0,0,0.35)",
  display: "grid",
  gap: 10,
}

const cardHeader: React.CSSProperties = {
  fontFamily: "Orbitron, 'Segoe UI', system-ui, sans-serif",
  letterSpacing: 0.8,
  textTransform: "uppercase",
  color: "#e0e7ff",
}

const metricRow: React.CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  alignItems: "center",
}

const metricBlock: React.CSSProperties = {
  padding: 12,
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
}

const metricLabel: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  color: "#cbd5e1",
  marginBottom: 4,
}

const metricValue: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#fef3c7",
}

const ctaLink: React.CSSProperties = {
  color: "#93c5fd",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
}

const cardNote: React.CSSProperties = {
  margin: 0,
  color: "#cbd5e1",
  fontSize: 13,
}

const ghostButton: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.04)",
  color: "#e5e7eb",
  cursor: "pointer",
  fontWeight: 700,
  fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
}
