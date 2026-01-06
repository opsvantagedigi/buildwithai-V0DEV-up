import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap Builder — Build With AI",
  description: "Map site architecture from your goals, funnels, and content strategy.",
}

export default function SitemapToolPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16 md:px-10 md:py-20 font-inter text-sm">
        <section className="space-y-3 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">AI TOOL</p>
          <h1 className="font-heading text-3xl font-semibold leading-tight brand-gradient-text md:text-4xl">
            Sitemap Builder
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Map your site architecture from business goals, funnels, and content strategy — then send it straight into
            the Builder.
          </p>
        </section>
      </main>
    </div>
  )
}
