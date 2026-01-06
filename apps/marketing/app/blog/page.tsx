import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog — Build With AI",
  description: "Insights, updates, and stories from the future of AI-powered creation.",
}

const POSTS = [
  {
    slug: "cinematic-ai-websites",
    title: "What a Cinematic AI Website Actually Looks Like",
    date: "2026-01-05",
    excerpt:
      "Cinematic doesn’t just mean gradients. It’s about pacing, story, and how your site feels in motion.",
  },
  {
    slug: "founder-playbook",
    title: "The Founder’s Playbook for Shipping Sites in a Weekend",
    date: "2026-01-02",
    excerpt:
      "How to move from idea to investor-ready landing page using Build With AI in under 48 hours.",
  },
  {
    slug: "ai-tools-for-creators",
    title: "AI Tools That Feel Like Creative Partners, Not Prompts",
    date: "2025-12-18",
    excerpt:
      "We built the AI stack for people who think in stories, not spreadsheets.",
  },
]

export default function BlogPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
        <section className="space-y-4 text-center">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">BLOG</p>
          <h1 className="font-heading text-3xl font-semibold leading-tight brand-gradient-text md:text-4xl">
            Insights, updates, and stories from the future of AI-powered creation.
          </h1>
        </section>

        <section className="mb-10 grid gap-6 font-inter text-sm md:grid-cols-2">
          {POSTS.map((post) => (
            <article key={post.slug} className="glass-panel flex flex-col rounded-2xl p-6">
              <p className="text-[11px] text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
              <h2 className="mt-2 text-base font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-xs text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4">
                <Link href={`/blog/${post.slug}`} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300 hover:text-emerald-200">
                  Read story
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
