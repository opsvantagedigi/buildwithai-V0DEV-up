import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Sites",
  description: "Manage your Build With AI sites, drafts, and live deployments.",
}

export default function DashboardSitesPage() {
  const sites = [
    { name: "Cinematic Studio", status: "Draft", url: "https://studio.demo" },
    { name: "AI Portfolio", status: "Published", url: "https://portfolio.demo" },
  ]

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-white">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/60">Dashboard</p>
          <h1 className="font-heading text-3xl font-semibold text-white">Sites</h1>
        </div>
        <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">New site</button>
      </header>
      <div className="space-y-3">
        {sites.map((site) => (
          <div key={site.name} className="glass-panel flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="text-white/60">{site.url}</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">{site.status}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/60 text-sm">TODO: Hook to live site inventory and CRUD actions.</p>
    </main>
  )
}
