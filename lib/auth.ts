import { NextRequest, NextResponse } from "next/server"

const AUTH_COOKIE = "auth"

export function isAuthenticated(request: NextRequest): boolean {
  const authCookie = request.cookies.get(AUTH_COOKIE)?.value
  return authCookie === "1"
}

export function requireAuth(request: NextRequest, nextPath: string) {
  if (isAuthenticated(request)) {
    return null
  }

  const redirectUrl = new URL("/login", request.nextUrl)
  redirectUrl.searchParams.set("next", nextPath)
  return NextResponse.redirect(redirectUrl)
}

export function ensurePostAuth(request: Request | NextRequest) {
  // Accept both NextRequest (middleware) and Fetch API Request (route handlers)
  const cookieHeader = request.headers.get("cookie") || ""
  const cookieMap = new Map(
    cookieHeader.split(";").map((pair) => {
      const [key, value] = pair.trim().split("=")
      return [key, value]
    }),
  )

  const authCookie = cookieMap.get(AUTH_COOKIE)
  if (authCookie !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}

// TODO: Replace cookie-based placeholder auth with real session/token validation.
