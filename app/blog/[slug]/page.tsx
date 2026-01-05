import type { Metadata } from "next"
import Link from "next/link"
import type { ResolvingMetadata } from "next"

const DEFAULT_TITLE = "Build With AI Blog Post"

const POSTS: Record<string, { title: string; date: string; body: string }> = {
  "cinematic-ai-websites": {
    title: "What a Cinematic AI Website Actually Looks Like",
    date: "2026-01-05",
    body:
      "Cinematic websites are about rhythm, story, and how each section feels in motion — not just gradients and shadows.",
  },
  "founder-playbook": {
    title: "The Founder’s Playbook for Shipping Sites in a Weekend",
    date: "2026-01-02",
    body:
      "With Build With AI, you can move from idea to investor-ready narrative in a single weekend, without sacrificing craft.",
  },
  "ai-tools-for-creators": {
    title: "AI Tools That Feel Like Creative Partners, Not Prompts",
    date: "2025-12-18",
    body:
      "The right AI tools feel like a co-founder sitting beside you, helping you shape the story you already want to tell.",
  },
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = POSTS[params.slug]
  return {
    title: post ? `${post.title} — Build With AI` : DEFAULT_TITLE,
    description: post?.body ?? "Story from the Build With AI blog.",
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug]

  const title = post?.title ?? DEFAULT_TITLE
  const date = post?.date ?? "2026-01-01"
  const body =
    post?.body ??
    "This is a placeholder entry for a future Build With AI story. Check back soon for more from the cinematic web studio.";

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 md:px-10 md:py-20">
        <section className="space-y-3">
          <p className="font-heading text-[11px] tracking-[0.35em] text-muted-foreground uppercase">BLOG</p>
          <h1 className="font-heading text-3xl font-semibold text-white md:text-4xl">{title}</h1>
          <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
        </section>

        <section className="mb-6 space-y-4 font-inter text-sm text-muted-foreground">
          <p>{body}</p>
        </section>

        <section className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 font-inter text-sm">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-100"
          >
            Launch the Builder
          </Link>
          <Link href="/blog" className="text-xs text-muted-foreground underline-offset-2 hover:underline">
            Back to all stories
          </Link>
        </section>
      </main>
    </div>
  )
}
