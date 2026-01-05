import { NextResponse } from "next/server"
import type { MonitoringEvent } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body)
    ? body
    : body && Array.isArray(body.events)
    ? body.events
    : []

  console.log("[OperatorApp] /api/monitoring/events", {
    count: events.length,
    sample: events[0],
  })

  return NextResponse.json({ ok: true, count: events.length })
}
