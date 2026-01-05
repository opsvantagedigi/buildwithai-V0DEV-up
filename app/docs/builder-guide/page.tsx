import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builder Guide — Docs — Build With AI",
  description: "Builder guide for Build With AI. Structured docs placeholder.",
}

export default function BuilderGuideDocsPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16 md:px-10 md:py-20 font-inter text-sm text-muted-foreground">
        <header className="space-y-2">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">DOCS</p>
          <h1 className="font-heading text-2xl font-semibold text-white">Builder Guide</h1>
          <p className="text-xs">Structured documentation placeholder.</p>
        </header>
      </main>
    </div>
  )
}
