import { NextResponse } from "next/server"
import type { MonitoringEvent } from "@/lib/types"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const events: MonitoringEvent[] = Array.isArray(body)
    ? body
    : body && Array.isArray(body.events)
    ? body.events
    : []

  // For now, just log for visibility in development.
  console.log("/api/monitoring/events", { count: events.length, events })

  return NextResponse.json({ ok: true })
}
