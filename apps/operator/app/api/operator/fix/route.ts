import { NextResponse } from "next/server"
import { listLogs } from "@/lib/audit"
import { executeFix, classifyRisk, shouldAutoApply } from "@/lib/autonomy"
import { generateRollbackPlan } from "@/lib/rollback"
import { listSnapshots } from "@/lib/snapshots"
import type { RemediationProposal, RollbackPlan } from "@/lib/types"

export async function GET() {
  return NextResponse.json({ logs: listLogs(), snapshots: listSnapshots() })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const proposal: RemediationProposal | undefined = body?.proposal
  const approved: boolean = Boolean(body?.approved)
  const rollbackPlan: RollbackPlan | undefined = body?.rollbackPlan ??
    (proposal?.diagnosisId ? generateRollbackPlan(proposal.diagnosisId) : undefined)

  if (!proposal) {
    return NextResponse.json({ error: "Missing proposal" }, { status: 400 })
  }

  const risk = classifyRisk(proposal)
  if (risk === "high") {
    const result = await executeFix(proposal, { approved, rollbackPlan })
    return NextResponse.json({ ...result, risk, rollbackPlan }, { status: 403 })
  }

  if (!shouldAutoApply(risk, approved)) {
    return NextResponse.json({ status: "pending-approval", risk, message: "Approval required before applying fix." }, { status: 202 })
  }

  const result = await executeFix(proposal, { approved, rollbackPlan })
  const status = result.status === "rejected" ? 403 : result.status === "pending-approval" ? 202 : 200
  return NextResponse.json({ ...result, risk, rollbackPlan }, { status })
}
