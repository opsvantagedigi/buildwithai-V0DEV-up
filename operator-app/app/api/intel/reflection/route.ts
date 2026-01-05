import { NextResponse } from "next/server"
import { getRecentIncidents } from "@/lib/intel"
import { reflectBySubsystem, reflectDaily, reflectWeekly } from "@/lib/reflection"

export async function GET() {
  const incidents = getRecentIncidents(400)
  const dailyReflection = reflectDaily(incidents)
  const weeklyReflection = reflectWeekly(incidents)
  const subsystemReflection = reflectBySubsystem(incidents)

  return NextResponse.json({ dailyReflection, weeklyReflection, subsystemReflection })
}
