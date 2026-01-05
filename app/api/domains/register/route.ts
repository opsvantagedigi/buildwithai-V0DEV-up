import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function POST(request: Request) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const body = await request.json().catch(() => ({}))
  const { domain = "example.ai", siteId = "demo-site" } = body
  const registeredAt = new Date().toISOString()

  return NextResponse.json({ domain, siteId, status: "registered", registeredAt })
}

// TODO: Connect to reseller API to register and attach domains.
