import { NextRequest, NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function POST(request: NextRequest, context: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await context.params
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const publishedAt = new Date().toISOString()
  return NextResponse.json({ siteId, status: "published", publishedAt })
}

// TODO: Trigger deployment pipeline and DNS updates.
