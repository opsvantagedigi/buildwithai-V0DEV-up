import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About — Build With AI",
  description:
    "A platform built on legacy, wisdom, and purpose. Learn the story behind Build With AI and the mission that powers it.",
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">ABOUT</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            A platform built on legacy, wisdom, and purpose.
          </h1>
        </section>

        {/* Story sections */}
        <section className="space-y-10 font-inter text-sm text-muted-foreground mb-10">
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Founder story</h2>
            <p className="mt-3 text-xs md:text-sm">
              Build With AI began as a way to honor the stories that shape us — the late nights, the small experiments,
              and the people who believed in our work before anyone else. It is a cinematic studio for the web, designed
              for founders and creators who care about craft.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Mother’s wisdom</h2>
            <p className="mt-3 text-xs md:text-sm">
              At the heart of Build With AI is a simple idea: every creator deserves a voice. The platform is inspired by
              a mother’s wisdom — to build with care, honor your name, and leave things better than you found them.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Marz as Legacy Co‑Founder</h2>
            <p className="mt-3 text-xs md:text-sm">
              Marz is woven into the DNA of the platform as a Legacy Co‑Founder — a reminder that technology can carry
              forward the spirit, values, and creativity of the people we love.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Mission</h2>
            <p className="mt-3 text-xs md:text-sm">
              To give every founder, agency, and creator a cinematic way to tell their story — without needing a full
              engineering team or weeks of iteration.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Vision</h2>
            <p className="mt-3 text-xs md:text-sm">
              A world where launching a site that feels like a film — rich, intentional, and emotionally resonant — is as
              simple as sharing your brief.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Values</h2>
            <ul className="mt-3 space-y-2 text-xs md:text-sm">
              <li>Legacy first: build products that respect where people come from.</li>
              <li>Cinematic quality: ship experiences that feel crafted, not generic.</li>
              <li>Creator control: no lock-in, no dark patterns, full ownership.</li>
              <li>Honest AI: assist, don’t replace — keep the human voice centered.</li>
            </ul>
          </article>

          <div className="flex justify-center pt-4">
            <Link href="/builder" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold text-slate-950 hover:bg-slate-100">
              Build Your First Site
              <ArrowRight className="ml-2 size-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
