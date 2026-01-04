import { LayoutGrid, FileText, Zap, Globe, Settings, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutGrid, label: "Projects", active: true },
  { icon: FileText, label: "Pages" },
  { icon: Wand2, label: "AI Ritual" },
  { icon: Globe, label: "Deployment" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar() {
  return (
    <div className="w-64 h-full border-r border-white/5 flex flex-col bg-card/20 backdrop-blur-md">
      <div className="p-8 flex items-center gap-3">
        <div className="size-8 bg-white rounded-lg flex items-center justify-center">
          <Zap className="size-5 text-black fill-black" />
        </div>
        <span className="font-bold tracking-tight text-xl">Ritual</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                : "text-muted-foreground hover:text-white hover:bg-white/5",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="glass-panel rounded-2xl p-4 space-y-3">
          <div className="size-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10 shadow-lg" />
          <div>
            <p className="text-sm font-semibold">Starter Plan</p>
            <p className="text-xs text-muted-foreground">3 sites remaining</p>
          </div>
        </div>
      </div>
    </div>
  )
}
