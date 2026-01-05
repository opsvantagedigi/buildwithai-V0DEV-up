import type { Metadata } from "next"
import Link from "next/link"
import { cookies } from "next/headers"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Domains — Build With AI",
  description: "Find and connect the perfect domain, powered by registrar-grade domain intelligence.",
}

export default async function DomainsPage() {
  const cookieStore = await cookies()
  const isAuthed = cookieStore.get("auth")?.value === "1"
  const nextUrl = encodeURIComponent("/domains")
  const ctaHref = isAuthed ? "/dashboard/domains" : `/login?next=${nextUrl}`

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">DOMAINS</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            Find and connect the perfect domain.
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
            Powered by registrar-grade domain intelligence. Search names, explore TLDs, and connect domains to your
            cinematic sites in a few clicks.
          </p>
        </section>

        {/* Domain search UI description */}
        <section className="mb-10 space-y-6 rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 font-inter text-sm">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Search</p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Search for a domain..."
                className="h-10 flex-1 rounded-full border border-white/15 bg-black/70 px-4 text-xs text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <button className="h-10 rounded-full bg-white px-5 text-xs font-semibold text-slate-950 hover:bg-slate-100">
                Search
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] text-xs text-muted-foreground">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Availability</p>
              <div className="glass-panel rounded-2xl p-4">
                <p className="text-white/90">yourbrand.ai</p>
                <p className="text-emerald-300">Available</p>
                <p className="mt-1 text-[11px]">$24 / year • Premium AI TLD</p>
              </div>
              <div className="glass-panel rounded-2xl p-4">
                <p className="text-white/90">yourbrand.com</p>
                <p className="text-amber-300">Taken</p>
                <p className="mt-1 text-[11px]">Suggested alternatives available across .co, .io, and more.</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">TLD suggestions</p>
              <div className="glass-panel rounded-2xl p-4">
                <ul className="space-y-1">
                  <li>.ai • For AI-first products and studios</li>
                  <li>.studio • For cinematic, creative, or production brands</li>
                  <li>.dev • For developer tools and platforms</li>
                  <li>.xyz • For experimental and future-forward projects</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-100"
            >
              Register &amp; Attach
              <ArrowRight className="ml-2 size-3.5" />
            </Link>
          </div>
          <p className="text-white/60 text-xs">TODO: Wire search input to /api/domains/search and handle authenticated registration via /api/domains/register.</p>
        </section>
      </main>
    </div>
  )
}
