import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Build With AI",
  description: "We’re here to help you build something meaningful. Reach out to the Build With AI team.",
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-4 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">CONTACT</p>
          <h1 className="font-heading text-3xl font-semibold leading-tight brand-gradient-text md:text-4xl">
            We’re here to help you build something meaningful.
          </h1>
          <p className="mx-auto max-w-xl text-sm md:text-base text-muted-foreground font-inter">
            Share what you’re building, what you need, or any questions you have. A real human will get back to you.
          </p>
        </section>

        {/* Contact form */}
        <section className="mb-10 rounded-3xl border border-white/10 bg-black/60 p-6 md:p-8 font-inter text-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-medium text-white/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="h-10 w-full rounded-lg border border-white/15 bg-black/70 px-3 text-xs text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="h-10 w-full rounded-lg border border-white/15 bg-black/70 px-3 text-xs text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-medium text-white/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="min-h-30 w-full rounded-lg border border-white/15 bg-black/70 px-3 py-2 text-xs text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                placeholder="Tell us about your project, questions, or ideas."
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-100"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
