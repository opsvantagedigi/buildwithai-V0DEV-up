import { NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/auth"

const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/sites",
  "/dashboard/analytics",
  "/dashboard/domains",
  "/dashboard/templates",
  "/dashboard/settings",
  "/builder/live",
]

export default async function proxy(req: NextRequest) {
  const session = await getSession(req)
  const { pathname, search } = req.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtected && !session.authenticated) {
    const redirectUrl = new URL("/login", req.nextUrl)
    redirectUrl.searchParams.set("next", `${pathname}${search}`)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/builder/live"],
}
