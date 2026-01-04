"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AiTimeline } from "@/components/ai-timeline"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Wand2, Sparkles } from "lucide-react"

export default function Dashboard() {
  const [isBuilding, setIsBuilding] = useState(false)
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 relative flex flex-col items-center justify-center p-8">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-2xl z-10 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight glow-text text-balance">
              Describe what you want to build
            </h1>
            <p className="text-muted-foreground text-lg">One sentence. Your intent becomes infrastructure.</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
            <div className="relative glass-panel rounded-[1.75rem] p-6 shadow-2xl transition-all duration-300 group-focus-within:shadow-white/[0.02]">
              <Textarea
                placeholder="A minimalist portfolio for a creative developer with a dark aesthetic and bento grid layout..."
                className="bg-transparent border-none focus-visible:ring-0 text-xl min-h-[140px] resize-none p-0 placeholder:text-muted-foreground/50 leading-relaxed"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <Sparkles className="size-3" />
                  <span>AI ready</span>
                </div>
                <Button
                  size="lg"
                  onClick={() => setIsBuilding(true)}
                  disabled={!prompt || isBuilding}
                  className="rounded-full px-8 bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <Wand2 className="size-4 mr-2" />
                  Build with AI
                </Button>
              </div>
            </div>
          </div>

          {isBuilding && <AiTimeline />}
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 font-mono">
          <span>Ritual Engine v1.0.4</span>
          <div className="size-1 bg-white/20 rounded-full" />
          <span>London Node</span>
        </div>
      </main>
    </div>
  )
}
