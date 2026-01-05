import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function POST(request: Request) {
  // Auth-only action
  const authError = ensurePostAuth(request as any)
  if (authError) return authError

  const body = await request.json().catch(() => ({}))
  const { siteId = "demo-site", page = {}, prompt = "" } = body
  const savedAt = new Date().toISOString()

  return NextResponse.json({
    siteId,
    page,
    prompt,
    savedAt,
    status: "saved",
  })
}

// TODO: Persist pages to database and associate with authenticated user.
