import { NextResponse } from "next/server"
import { listLogs } from "@/lib/audit"
import { listSnapshots } from "@/lib/snapshots"
import { sendEmail } from "@/lib/email"

export async function POST() {
  const logs = listLogs()
  const snapshots = listSnapshots()

  const summaryText = [
    `Daily autonomy summary` ,
    `Logs: ${logs.length}`,
    `Snapshots: ${snapshots.length}`,
  ].join("\n")

  const { sent, reason } = await sendEmail({
    category: "daily-summary",
    subject: "Operator Daily Summary",
    text: summaryText,
  })

  return NextResponse.json({ sent, reason })
}
