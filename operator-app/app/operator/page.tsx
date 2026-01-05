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
    <main style={{ minHeight: "100vh", background: "#040711", padding: "16px" }}>
      <OperatorTopBar email={session.email} role={session.role} />
      <h1 style={{ color: "#e5e7eb", marginBottom: 12 }}>Operator Intelligence</h1>
      <IntelligencePanel sessionId="operator" />
    </main>
  )
}
