import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function POST(request: Request, context: any) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const params = context?.params
  const resolved = typeof params?.then === "function" ? await params : params
  const siteId = resolved?.siteId

  const publishedAt = new Date().toISOString()
  return NextResponse.json({ siteId, status: "published", publishedAt })
}

// TODO: Trigger deployment pipeline and DNS updates.
