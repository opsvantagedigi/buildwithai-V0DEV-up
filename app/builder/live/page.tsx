import type { Metadata } from "next"
import { Suspense } from "react"
import { BuilderLiveClient } from "./client"

export const metadata: Metadata = {
  title: "Builder Live Workspace — Build With AI",
  description: "Minimal live workspace for generating, previewing, and publishing AI-built websites in real time.",
}

export default function BuilderLivePage() {
  return (
    <Suspense fallback={null}>
      <BuilderLiveClient />
    </Suspense>
  )
}
