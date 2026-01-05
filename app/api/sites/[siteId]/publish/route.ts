import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { siteId: string } }) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const publishedAt = new Date().toISOString()
  return NextResponse.json({ siteId: params.siteId, status: "published", publishedAt })
}

// TODO: Trigger deployment pipeline and DNS updates.
