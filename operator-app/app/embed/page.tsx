import OperatorShell from "@/components/OperatorShell"

type EmbedPageProps = {
  searchParams?: {
    sessionId?: string
    mode?: string
  }
}

export default function EmbedPage({ searchParams }: EmbedPageProps) {
  const sessionId = searchParams?.sessionId ?? ""
  const mode = searchParams?.mode === "video" ? "video" : "chat"

  return (
    <main style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#040711" }}>
      <OperatorShell sessionId={sessionId} mode={mode} />
    </main>
  )
}
