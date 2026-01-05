"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Section = {
  id: string
  type: string
  headline?: string
  subheadline?: string
  items?: string[]
}

export function BuilderLiveClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")
  const [primaryGoal, setPrimaryGoal] = useState("launch")
  const [pageType, setPageType] = useState("landing")
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>("")

  const nextPath = useMemo(() => {
    const params = searchParams?.toString()
    return params ? `/builder/live?${params}` : "/builder/live"
  }, [searchParams])

  useEffect(() => {
    // Placeholder auth: look for auth=1 cookie. Redirect if missing.
    const hasAuth = document.cookie.split(";").some((c) => c.trim().startsWith("auth=1"))
    if (!hasAuth) {
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`)
    }
  }, [router, nextPath])

  const generateLayout = async () => {
    setLoading(true)
    setStatus("Generating layout...")
    try {
      const res = await fetch("/api/builder/generate-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, primaryGoal, pageType }),
      })
      const data = await res.json()
      setSections(data.sections || [])
      setStatus("Layout ready")
    } catch (error) {
      console.error(error)
      setStatus("Failed to generate layout")
    } finally {
      setLoading(false)
    }
  }

  const saveDraft = async () => {
    setStatus("Saving draft...")
    try {
      await fetch("/api/builder/save-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: "demo-site", page: { sections }, prompt }),
      })
      setStatus("Draft saved")
    } catch (error) {
      console.error(error)
      setStatus("Failed to save draft")
    }
  }

  const publishSite = async () => {
    setStatus("Publishing...")
    try {
      await fetch("/api/sites/demo/publish", { method: "POST" })
      setStatus("Published to demo domain")
    } catch (error) {
      console.error(error)
      setStatus("Publish failed")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-3 text-xs font-inter">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-tr from-[#4f7cff] via-[#22c55e] to-[#facc15]" />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/70">Project</p>
            <p className="text-[11px] text-white/90">Untitled cinematic site</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-inter text-white/80" onClick={saveDraft}>
            Save draft
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-white/20 px-3 text-[11px] font-inter text-white/90" onClick={() => setStatus("Preview opened")}> 
            Preview
          </Button>
          <Button
            size="sm"
            className="h-8 rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] px-4 text-[11px] font-semibold font-inter text-black shadow-[0_0_22px_rgba(79,124,255,0.7)]"
            onClick={publishSite}
          >
            Publish
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-4 py-4 md:flex-row md:px-6 md:py-6">
        <section className="flex w-full flex-col gap-3 md:w-[30%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Prompt</h2>
          <div className="glass-panel flex-1 rounded-2xl p-4">
            <Textarea
              placeholder="Describe your site, brand, and goals."
              className="min-h-55 w-full border border-white/10 bg-black/50 text-xs text-white placeholder:text-muted-foreground/70"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/80">
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Primary goal</span>
                <select
                  className="rounded-lg border border-white/10 bg-black/40 px-2 py-1"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                >
                  <option value="launch">Launch</option>
                  <option value="waitlist">Waitlist</option>
                  <option value="sales">Sales</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Page type</span>
                <select
                  className="rounded-lg border border-white/10 bg-black/40 px-2 py-1"
                  value={pageType}
                  onChange={(e) => setPageType(e.target.value)}
                >
                  <option value="landing">Landing</option>
                  <option value="product">Product</option>
                  <option value="pricing">Pricing</option>
                </select>
              </label>
            </div>
            <Button
              size="sm"
              disabled={loading}
              onClick={generateLayout}
              className="mt-3 h-9 w-full rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-[11px] font-semibold font-inter text-black"
            >
              {loading ? "Generating..." : "Generate layout"}
            </Button>
            <p className="mt-2 text-[10px] text-muted-foreground font-inter">TODO: Connect real AI generation.</p>
          </div>
        </section>

        <section className="flex w-full flex-col gap-3 md:w-[45%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Canvas</h2>
          <div className="glass-panel flex-1 rounded-2xl border-dashed border-white/15 bg-black/60 p-4 text-xs font-inter text-muted-foreground">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Live layout preview</p>
            {sections.length === 0 ? (
              <p className="mt-3 text-white/80">Generate to see hero, features, and CTA blocks rendered here.</p>
            ) : (
              <div className="mt-3 space-y-3 text-white/90">
                {sections.map((section) => (
                  <div key={section.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{section.type}</p>
                    {section.headline && <p className="mt-1 font-semibold">{section.headline}</p>}
                    {section.subheadline && <p className="text-sm text-white/80">{section.subheadline}</p>}
                    {section.items && (
                      <ul className="mt-2 list-disc pl-4 text-xs text-white/80">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 text-[11px] font-inter text-muted-foreground">
            <Button variant="outline" size="sm" className="h-8 flex-1 border-white/20 text-white/80" onClick={() => setStatus("Preview opened")}>Preview</Button>
            <Button
              size="sm"
              className="h-8 flex-1 rounded-full bg-linear-to-r from-[#4f7cff] via-[#22c55e] to-[#facc15] text-[11px] font-semibold text-black"
              onClick={publishSite}
            >
              Publish to Domain
            </Button>
          </div>
        </section>

        <section className="flex w-full flex-col gap-3 md:w-[25%]">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Properties</h2>
          <div className="glass-panel flex-1 space-y-3 rounded-2xl p-4 text-xs font-inter text-muted-foreground">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Theme</p>
              <div className="mt-2 flex gap-2 text-[11px]">
                <button className="flex-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-white/90">Hybrid Cinematic</button>
                <button className="flex-1 rounded-lg border border-white/10 bg-black/40 px-2 py-1">Minimal</button>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Structure</p>
              <ul className="mt-2 space-y-1">
                <li>Hero • Story rail</li>
                <li>Feature grid • Social proof</li>
                <li>Pricing • FAQ • Footer</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Actions</p>
              <div className="mt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm" className="h-8 border-white/20 text-white/80" onClick={saveDraft}>
                  Save draft
                </Button>
                <Button size="sm" className="h-8 bg-white text-slate-900" onClick={publishSite}>
                  Publish
                </Button>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</p>
              <p className="mt-1 text-[11px] text-emerald-300">{status || "Idle"}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
