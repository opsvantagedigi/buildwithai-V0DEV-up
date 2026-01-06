import { NextResponse } from "next/server"
import { getVideoSessionUrl } from "@/lib/video"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const { sessionId } = body ?? {}
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })

  const url = getVideoSessionUrl(String(sessionId))
  return NextResponse.json({ url })
}
