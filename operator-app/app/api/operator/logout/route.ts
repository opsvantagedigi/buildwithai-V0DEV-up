import { NextResponse } from "next/server"
import { clearOperatorSession } from "@/lib/operator-auth"

export async function POST() {
  await clearOperatorSession()
  return NextResponse.json({ success: true })
}
