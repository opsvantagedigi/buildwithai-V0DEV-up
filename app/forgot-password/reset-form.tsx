"use client"

import Link from "next/link"
import { useState } from "react"

export default function ResetForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs text-white/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="h-9 w-full rounded-lg border border-white/15 bg-black/70 px-3 text-xs text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-100"
        >
          Send reset link
        </button>
        {submitted && (
          <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
            If an account exists for that email, we&apos;ve sent a reset link.
          </div>
        )}
      </form>

      <div className="mt-6 text-center text-xs text-white/70">
        Remembered your password?{" "}
        <Link href="/login" className="text-white hover:text-white/90 underline underline-offset-4">
          Back to login
        </Link>
      </div>
    </>
  )
}
