import Sidebar from "./sidebar";
import AiTimeline from "./ai-timeline";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 h-screen p-4">
        <Sidebar />
      </aside>
      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Describe what you want to build
            </h1>
            <p className="text-sm text-muted-foreground">
              One sentence. Your intent becomes infrastructure.
            </p>
          </header>

          <section className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <textarea
                rows={3}
                className="w-full resize-none bg-transparent outline-none text-sm text-white placeholder:text-muted-foreground"
                placeholder="A minimalist portfolio for a…"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/15"
              >
                AI Ready
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Build with AI
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
              AI Timeline
            </h2>
            <AiTimeline />
          </section>

          <footer className="pt-4 border-t border-white/5 text-right">
            <p className="text-xs text-muted-foreground">
              Ritual Engine v1.0.4 • London Node
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
