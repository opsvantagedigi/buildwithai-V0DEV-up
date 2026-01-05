import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { requireAuth } from "./lib/auth"

const PROTECTED_PATHS = ["/dashboard", "/builder/live"]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isProtected) {
    const authRedirect = requireAuth(request, pathname + request.nextUrl.search)
    if (authRedirect) return authRedirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/builder/live"],
}
