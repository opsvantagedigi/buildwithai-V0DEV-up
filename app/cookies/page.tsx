import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy — Build With AI",
  description: "Read the Build With AI cookie policy. Structured legal content placeholder.",
}

export default function CookiesPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 md:px-10 md:py-20 font-inter text-sm text-muted-foreground">
        <header className="space-y-3">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">LEGAL</p>
          <h1 className="font-heading text-3xl font-semibold text-white">Cookie Policy</h1>
          <p className="text-xs text-muted-foreground">Structured legal content placeholder.</p>
        </header>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-white">1. Cookies</h2>
          <p>Explain what cookies are and how they are used on your site.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-white">2. Managing Cookies</h2>
          <p>Describe how users can manage or disable cookies.</p>
        </section>
      </main>
    </div>
  )
}
