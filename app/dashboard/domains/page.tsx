import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Domains — Build With AI",
  description: "Manage and attach domains to your Build With AI sites.",
}

export default function DashboardDomainsPage() {
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
      </main>
    </div>
  )
}
