"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { headerLinks } from "@/config/nav"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-4">
        <div className="flex items-center justify-between gap-4 lg:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-brand-blue via-brand-purple to-brand-pink shadow-lg ring-2 ring-white/20">
              <Image src="/brand-icon.png" alt="Build With AI" width={36} height={36} className="h-9 w-9" priority />
            </span>
            <span className="text-xs font-orbitron font-extrabold tracking-[0.3em] bg-linear-to-tr from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] bg-clip-text text-transparent sm:text-sm">
              BUILD WITH AI
            </span>
          </Link>
        </div>

        <nav className="font-inter text-xs text-white/70 sm:text-sm">
          <div className="hidden items-center gap-6 lg:flex">
            {headerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="rounded-full bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-4 py-2 text-xs font-orbitron font-bold text-black shadow-lg shadow-brand-blue/40 transition hover:opacity-90 focus:outline-none sm:px-5 sm:text-sm"
            >
              Get Started for FREE
            </Link>
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-yellow-300 hover:bg-black/50 focus:outline-none"
              >
                <span className="text-xs">{theme === "dark" ? "☀" : "☾"}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 lg:hidden">
            {headerLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] text-white/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="rounded-full bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-3 py-1 text-[0.7rem] font-orbitron font-bold text-black shadow-lg shadow-brand-blue/40 hover:opacity-90 focus:outline-none"
            >
              Get Started
            </Link>
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-yellow-300 hover:bg-black/50 focus:outline-none"
              >
                <span className="text-xs">{theme === "dark" ? "☀" : "☾"}</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
