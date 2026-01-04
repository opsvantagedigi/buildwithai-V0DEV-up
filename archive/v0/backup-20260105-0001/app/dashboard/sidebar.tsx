import { cn } from "@/lib/utils";
import {
	Bot,
	Globe2,
	LayoutDashboard,
	Settings,
	Sparkles,
} from "lucide-react";

const navItems = [
	{ icon: LayoutDashboard, label: "Projects", active: true },
	{ icon: Globe2, label: "Pages" },
	{ icon: Bot, label: "AI Ritual" },
	{ icon: Sparkles, label: "Deployment" },
	{ icon: Settings, label: "Settings" },
];

export default function Sidebar() {
	return (
		<div className="flex h-full flex-col justify-between rounded-2xl glass-panel p-6 font-sans">
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<div className="size-8 rounded-xl bg-linear-to-tr from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] shadow-[0_0_22px_rgba(79,124,255,0.7)]" />
					<div className="space-y-0.5">
						<p className="font-heading text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
							Ritual
						</p>
						<p className="font-heading text-sm font-medium text-white">AI Website Studio</p>
					</div>
				</div>

				<nav className="space-y-1 text-xs">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = item.active;

						return (
							<button
								key={item.label}
								className={cn(
									"group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-muted-foreground transition-colors duration-300",
									isActive
										? "bg-white/10 text-white shadow-[0_0_18px_rgba(255,255,255,0.1)]"
										: "hover:bg-white/5 hover:text-white",
								)}
							>
								<span className="flex items-center gap-2">
									<span className="inline-flex size-6 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] text-muted-foreground group-hover:border-white/20 group-hover:text-white/90">
										<Icon className="size-3" />
									</span>
									<span className="font-medium">{item.label}</span>
								</span>
								{isActive && (
									<span className="rounded-full bg-emerald-400/18 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
										Active
									</span>
								)}
							</button>
						);
					})}
				</nav>
			</div>

			<div className="space-y-3 text-xs text-muted-foreground">
				<div className="rounded-xl border border-white/10 bg-white/5 p-3">
					<div className="flex items-center justify-between">
						<span className="text-[11px] font-medium text-white/90">
							Starter plan
						</span>
						<span className="rounded-full bg-emerald-400/18 px-2 py-0.5 text-[10px] text-emerald-300">
							Live
						</span>
					</div>
					<p className="mt-1 text-[11px] text-muted-foreground">
						3 active rituals, realtime preview, export to Vercel.
					</p>
				</div>

				<div className="flex items-center justify-between text-[11px]">
					<span>Node: London • Edge</span>
					<span className="text-muted-foreground/70">Latency 34ms</span>
				</div>
			</div>
		</div>
	);
}

