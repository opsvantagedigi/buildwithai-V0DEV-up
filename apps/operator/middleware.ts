import { NextResponse, type NextRequest } from "next/server"
import { verifyOperatorSession } from "@/lib/operator-session"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/operator") && !pathname.startsWith("/operator-login") && !pathname.startsWith("/api/operator")) {
    const session = await verifyOperatorSession()
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = "/operator-login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
