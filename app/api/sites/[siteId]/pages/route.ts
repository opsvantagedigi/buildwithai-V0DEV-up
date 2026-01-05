import { NextRequest, NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await context.params
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const pages = [
    { id: "home", title: "Home", path: "/" },
    { id: "pricing", title: "Pricing", path: "/pricing" },
    { id: "about", title: "About", path: "/about" },
  ]

  return NextResponse.json({ siteId, pages })
}

// TODO: Replace placeholder pages with user-owned site pages.
