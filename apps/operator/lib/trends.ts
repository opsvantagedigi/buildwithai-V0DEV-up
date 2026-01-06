import type { IncidentRecord, SimpleTrend } from "@/lib/types"

function sliceHalves(records: IncidentRecord[]) {
  const midpoint = Math.floor(records.length / 2)
  const first = records.slice(0, midpoint)
  const second = records.slice(midpoint)
  return { first, second }
}

export function inferIncidentTrends(history: IncidentRecord[]): SimpleTrend[] {
  if (!history.length || history.length < 6) return []

  const { first, second } = sliceHalves(history)
  const firstCount = first.length
  const secondCount = second.length

  const ratio = firstCount === 0 ? secondCount : secondCount / Math.max(1, firstCount)

  let direction: SimpleTrend["direction"] = "flat"
  if (ratio > 1.2) direction = "up"
  else if (ratio < 0.8) direction = "down"

  const confidenceBase = Math.min(1, history.length / 40)
  const confidence = Number(confidenceBase.toFixed(2))

  return [
    {
      label: "incident-volume",
      direction,
      confidence,
    },
  ]
}
