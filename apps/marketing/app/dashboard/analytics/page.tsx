import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Analytics",
  description: "Traffic, conversions, and engagement for your AI-built sites.",
}

export default function DashboardAnalyticsPage() {
  const metrics = [
    { label: "Visitors", value: "12.3k", delta: "+8%" },
    { label: "Signups", value: "1.2k", delta: "+3%" },
    { label: "Conversion", value: "4.7%", delta: "+0.4pp" },
  ]

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-white">
      <header className="mb-6">
        <p className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/60">Dashboard</p>
        <h1 className="font-heading text-3xl font-semibold text-white">Analytics</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-panel rounded-2xl px-4 py-5">
            <p className="text-white/60 text-xs uppercase tracking-[0.2em]">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className="text-emerald-300 text-sm">{metric.delta}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-white/60 text-sm">TODO: Connect real analytics source and charts.</p>
    </main>
  )
}
