import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { domainId: string } }) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  return NextResponse.json({
    domainId: params.domainId,
    status: "active",
    dns: "propagating",
    lastChecked: new Date().toISOString(),
  })
}

// TODO: Wire to registrar DNS status checks.
