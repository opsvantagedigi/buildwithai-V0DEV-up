import type { Metadata } from "next"

import { LayoutRenderer } from "@/components/layout/LayoutRenderer"
import { homepage } from "@/config/pages/homepage"

export const metadata: Metadata = {
  title: "Build With AI — Create Without Limits",
  description:
    "Build With AI is a cinematic AI Website Builder that transforms your ideas into production-ready websites in seconds.",
}

export default function HomePage() {
  return <LayoutRenderer page={homepage} />
}
