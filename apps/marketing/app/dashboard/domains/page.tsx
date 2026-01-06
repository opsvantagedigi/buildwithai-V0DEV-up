import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Domains — Build With AI",
  description: "Manage and attach domains to your Build With AI sites.",
}

export default function DashboardDomainsPage() {
  const domains = [
    { domain: "studio.ai", status: "Active", dns: "propagating" },
    { domain: "portfolio.dev", status: "Pending", dns: "awaiting DNS" },
  ]

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16 md:px-10 md:py-20 font-inter text-sm">
        <header className="space-y-2">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">DASHBOARD</p>
          <h1 className="font-heading text-2xl font-semibold text-white md:text-3xl">Domains</h1>
          <p className="text-xs text-muted-foreground">
            Placeholder dashboard domains view. Replace with your actual connected domains and DNS status.
          </p>
        </header>

        <div className="space-y-3">
          {domains.map((d) => (
            <div key={d.domain} className="glass-panel flex items-center justify-between rounded-2xl px-4 py-3">
              <div>
                <p className="font-semibold text-white">{d.domain}</p>
                <p className="text-white/60 text-xs">DNS: {d.dns}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">{d.status}</span>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-xs">TODO: Connect to /api/domains/[domainId]/status and surface registrar details.</p>
      </main>
    </div>
  )
}
