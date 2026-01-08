import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function GET(request: Request, context: any) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const params = context?.params
  const resolved = typeof params?.then === "function" ? await params : params
  const domainId = resolved?.domainId

  return NextResponse.json({
    domainId,
    status: "active",
    dns: "propagating",
    lastChecked: new Date().toISOString(),
  })
}

// TODO: Wire to registrar DNS status checks.
