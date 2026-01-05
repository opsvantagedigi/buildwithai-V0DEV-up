import { NextResponse } from "next/server"
import { getChatResponse } from "@/lib/chat"

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined)
  const { sessionId, message } = body ?? {}

  if (!sessionId || !message) {
    return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 })
  }

  const reply = await getChatResponse(String(sessionId), String(message))
  return NextResponse.json({ reply })
}
