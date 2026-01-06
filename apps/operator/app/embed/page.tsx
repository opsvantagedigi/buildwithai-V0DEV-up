import OperatorShell from "@/components/OperatorShell"

type EmbedPageProps = {
  searchParams?: {
    sessionId?: string
    mode?: string
    level?: string
  }
}

export default function EmbedPage({ searchParams }: EmbedPageProps) {
  const sessionId = searchParams?.sessionId ?? ""
  const mode = searchParams?.mode === "video" ? "video" : "chat"
  const rawLevel = searchParams?.level
  const level = rawLevel === "A" || rawLevel === "B" || rawLevel === "C" ? rawLevel : undefined

  return (
    <main style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#040711" }}>
      <OperatorShell sessionId={sessionId} mode={mode} level={level} />
    </main>
  )
}
