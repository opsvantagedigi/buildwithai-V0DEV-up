import type { Metadata } from "next"
import ResetForm from "./reset-form"

export const metadata: Metadata = {
  title: "Reset Password — Build With AI",
  description: "Request a password reset link for your Build With AI account.",
}

export default function ForgotPasswordPage() {
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

        <ResetForm />
      </main>
    </div>
  )
}
