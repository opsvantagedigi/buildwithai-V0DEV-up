import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Docs — Build With AI",
  description: "Build With AI documentation. Everything you need to build, publish, and scale cinematic AI-powered websites.",
}

const SECTIONS = [
  { title: "Getting Started", href: "/docs/getting-started", description: "Set up your account and create your first site." },
  { title: "Builder Guide", href: "/docs/builder", description: "Deep dive into the AI Website Builder workspace." },
  { title: "Domains", href: "/docs/domains", description: "Connect, manage, and troubleshoot domains." },
  { title: "Deployment", href: "/docs/deployment", description: "Deployment flows, environments, and performance." },
  { title: "API", href: "/docs/api", description: "Programmatic access to the Build With AI platform." },
  { title: "Troubleshooting", href: "/docs/troubleshooting", description: "Common issues, fixes, and support paths." },
]

export default function DocsPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">DOCUMENTATION</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            Build With AI Documentation
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
            Everything you need to build, publish, and scale. Learn the Builder, domains, deployment, and APIs in one
            place.
          </p>
        </section>

        {/* Sections */}
        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <article key={section.href} className="glass-panel flex flex-col rounded-2xl p-6 font-inter text-sm">
              <h2 className="font-heading text-lg font-semibold text-white">{section.title}</h2>
              <p className="mt-2 text-xs text-muted-foreground">{section.description}</p>
              <div className="mt-4">
                <Link
                  href={section.href}
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 hover:text-emerald-200"
                >
                  Open docs
                  <ArrowRight className="ml-2 size-3" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
