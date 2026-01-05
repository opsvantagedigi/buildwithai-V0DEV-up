import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Templates",
  description: "Save and reuse cinematic templates for your sites.",
}

export default function DashboardTemplatesPage() {
  const templates = [
    { name: "Launch Landing", sections: 6 },
    { name: "Product Story", sections: 5 },
  ]

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <header className="mb-6">
        <p className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/60">Dashboard</p>
        <h1 className="font-heading text-3xl font-semibold text-white">Templates</h1>
      </header>
      <div className="space-y-3">
        {templates.map((tpl) => (
          <div key={tpl.name} className="glass-panel flex items-center justify-between rounded-2xl px-4 py-3">
            <div>
              <p className="font-semibold">{tpl.name}</p>
              <p className="text-white/60 text-sm">{tpl.sections} sections</p>
            </div>
            <button className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">Use template</button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/60 text-sm">TODO: Add create/edit/delete template flows.</p>
    </main>
  )
}
