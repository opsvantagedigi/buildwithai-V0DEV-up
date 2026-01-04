const navItems = [
  "Projects",
  "Pages",
  "AI Ritual",
  "Deployment",
  "Settings",
];

export default function Sidebar() {
  return (
    <div className="h-full glass-panel rounded-2xl p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Builder
          </p>
          <h1 className="mt-2 text-lg font-semibold text-white">
            AI Website Studio
          </h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 glass-panel rounded-lg px-3 py-2">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-white">Starter Plan</span> • 3 sites remaining
        </p>
      </div>
    </div>
  );
}
