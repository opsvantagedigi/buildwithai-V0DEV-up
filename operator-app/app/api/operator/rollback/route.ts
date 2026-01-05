import { NextResponse } from "next/server"
import { rollbackFix } from "@/lib/autonomy"
import { getSnapshot, listSnapshots } from "@/lib/snapshots"

export async function GET() {
  return NextResponse.json({ snapshots: listSnapshots() })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const snapshotId = body?.snapshotId as string | undefined
  const reason = body?.reason as string | undefined

  if (!snapshotId) {
    return NextResponse.json({ error: "Missing snapshotId" }, { status: 400 })
  }

  const snapshot = getSnapshot(snapshotId)
  if (!snapshot) {
    return NextResponse.json({ error: "Snapshot not found" }, { status: 404 })
  }

  const result = rollbackFix(snapshotId, reason)
  return NextResponse.json({ ...result, snapshotId })
}
