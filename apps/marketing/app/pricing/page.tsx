import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — Build With AI",
  description: "Simple, fair, founder-friendly pricing. Start free and upgrade only when you’re ready to scale.",
}

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "Forever",
    description: "Experiment with ideas and launch your first cinematic site.",
    highlight: false,
    features: [
      "3 AI generations per month",
      "1 active site",
      "Cinematic layouts and components",
      "Export-ready HTML sections",
    ],
  },
  {
    name: "Pro",
    price: "$24",
    cadence: "per month",
    description: "For founders and small teams shipping fast, polished experiences.",
    highlight: true,
    features: [
      "Unlimited AI generations",
      "Up to 10 active sites",
      "Custom domains and basic SEO",
      "Analytics foundation and funnels",
    ],
  },
  {
    name: "Founder",
    price: "$79",
    cadence: "per month",
    description: "For agencies and founders managing multiple brands and launches.",
    highlight: false,
    features: [
      "Unlimited projects and sites",
      "Priority compilation and support",
      "Multi-site dashboard and experiments",
      "Advanced SEO and content tools",
    ],
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    cadence: "Custom",
    description: "For platforms, studios, and enterprises who need custom workflows.",
    highlight: false,
    features: [
      "Custom SLAs and deployment models",
      "Dedicated success and integration support",
      "Compliance and security reviews",
      "White-label and API access",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-16 md:px-10 md:py-20">
        {/* Hero */}
        <section className="space-y-5 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">PRICING</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight brand-gradient-text md:text-5xl">
            Simple, fair, founder-friendly pricing.
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground font-inter">
            Start free. Upgrade when you’re ready. Every plan is built for speed, clarity, and control over your
            cinematic sites.
          </p>
        </section>

        {/* Plans */}
        <section className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`glass-panel flex h-full flex-col rounded-2xl p-6 font-inter text-sm ${
                plan.highlight ? "border border-emerald-300/60 shadow-[0_0_30px_rgba(16,185,129,0.4)]" : ""
              }`}
            >
              <div>
                <h2 className="font-heading text-lg font-semibold text-white">{plan.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  {plan.price}
                  {plan.cadence !== "Forever" && (
                    <span className="text-xs font-normal text-muted-foreground"> /{plan.cadence}</span>
                  )}
                </p>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-xs text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href="/signup"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-100"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
