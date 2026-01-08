import { NextResponse } from "next/server"
import { ensurePostAuth } from "@/lib/auth"

export async function GET(request: Request, context: any) {
  const authError = ensurePostAuth(request)
  if (authError) return authError

  const params = context?.params
  const resolved = typeof params?.then === "function" ? await params : params
  const siteId = resolved?.siteId

  const pages = [
    { id: "home", title: "Home", path: "/" },
    { id: "pricing", title: "Pricing", path: "/pricing" },
    { id: "about", title: "About", path: "/about" },
  ]

  return NextResponse.json({ siteId, pages })
}

// TODO: Replace placeholder pages with user-owned site pages.
