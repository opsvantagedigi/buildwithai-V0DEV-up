import { NextRequest, NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ domainId: string }> }) {
  const { domainId } = await context.params
  const authError = ensurePostAuth(request)
  if (authError) return authError

  return NextResponse.json({
    domainId,
    status: "active",
    dns: "propagating",
    lastChecked: new Date().toISOString(),
  })
}

// TODO: Wire to registrar DNS status checks.
