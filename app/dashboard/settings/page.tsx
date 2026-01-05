import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Settings",
  description: "Manage account, billing, and workspace preferences.",
}

export default function DashboardSettingsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <header className="mb-6">
        <p className="font-heading text-[11px] uppercase tracking-[0.3em] text-white/60">Dashboard</p>
        <h1 className="font-heading text-3xl font-semibold text-white">Settings</h1>
      </header>
      <div className="space-y-4 text-sm text-white/80 font-inter">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Account</h2>
          <p className="mt-2">Update name, email, and password.</p>
          <p className="text-white/60 text-sm">TODO: Connect to auth provider.</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Billing</h2>
          <p className="mt-2">Manage plan, payment method, and invoices.</p>
          <p className="text-white/60 text-sm">TODO: Attach billing system integration.</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-heading text-xl text-white">Workspace</h2>
          <p className="mt-2">Control theme, domains, and publishing defaults.</p>
          <p className="text-white/60 text-sm">TODO: Persist workspace preferences.</p>
        </div>
      </div>
    </main>
  )
}
