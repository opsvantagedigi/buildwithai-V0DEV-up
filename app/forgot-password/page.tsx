"use client"

import Link from "next/link"
import type { Metadata } from "next"
import { useState } from "react"

export const metadata: Metadata = {
  title: "Reset Password — Build With AI",
  description: "Request a password reset link for your Build With AI account.",
}

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-linear-to-tr from-[#0b1f4b]/70 via-[#22c55e]/40 to-[#facc15]/30 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-linear-to-tr from-[#4f7cff]/40 via-[#2ee6a6]/30 to-[#ffd166]/25 blur-[150px]" />
      </div>

      <main className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-black/70 p-8 font-inter text-sm">
        <h1 className="font-heading text-2xl font-semibold text-white">Reset your password.</h1>
        <p className="mt-2 text-xs text-white/70">
          Enter your email and, if your account exists, we&apos;ll send a link to reset your password.
        </p>
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
      </main>
    </div>
  )
}
