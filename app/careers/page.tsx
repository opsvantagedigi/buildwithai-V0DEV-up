import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers — Build With AI",
  description: "Help build the future of AI-powered creation. Explore careers at Build With AI.",
}

export default function CareersPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-6 py-16 md:px-10 md:py-20">
        <section className="space-y-4 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">CAREERS</p>
          <h1 className="font-heading text-3xl font-semibold leading-tight brand-gradient-text md:text-4xl">
            Help build the future of AI-powered creation.
          </h1>
        </section>

        <section className="space-y-8 font-inter text-sm text-muted-foreground mb-10">
          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">How we work</h2>
            <p className="mt-3 text-xs md:text-sm">
              We’re a small, focused team building cinematic tools for people who care about story and quality. We move
              quickly, default to trust, and ship products our families would be proud to use.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">Open roles</h2>
            <p className="mt-3 text-xs md:text-sm">
              We occasionally open roles in engineering, design, product, and customer experience. When we do, they’ll
              appear here with clear responsibilities and expectations.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-white">No roles? Write to us.</h2>
            <p className="mt-3 text-xs md:text-sm">
              If there are no open roles but you feel called to this work, send us a note about what you’d like to build
              with us and how you think you can help.
            </p>
          </article>
        </section>
      </main>
    </div>
  )
}
