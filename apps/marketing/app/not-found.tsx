import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-8 text-center font-inter text-sm">
        <h1 className="font-heading text-3xl font-semibold text-white">This page doesn’t exist.</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          The URL you’re looking for isn’t part of this cinematic experience yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-100"
        >
          Go Home
        </Link>
      </main>
    </div>
  )
}
