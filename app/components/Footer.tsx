import Link from "next/link"
import React from "react"
import { footerLinks } from "@/config/nav"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-8 text-xs text-white/70 md:text-sm">
          <div className="space-y-4 px-4 md:px-6 lg:px-8">
            <div className="text-[0.7rem] font-orbitron font-bold tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166]">
              Navigation
            </div>
            <ul className="space-y-2 font-inter">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 px-4 md:px-6 lg:px-8">
            <div className="text-[0.7rem] font-orbitron font-bold tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166]">
              Company
            </div>
            <ul className="space-y-2 font-inter">
              {footerLinks.slice(5, 10).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 px-4 md:px-6 lg:px-8">
            <div className="text-[0.7rem] font-orbitron font-bold tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166]">
              Explore
            </div>
            <ul className="space-y-2 font-inter">
              {footerLinks.slice(10, 15).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 px-4 md:px-6 lg:px-8 col-span-2 md:col-span-3 lg:col-span-2">
            <div className="text-[0.7rem] font-orbitron font-bold tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166]">
              Hybrid Cinematic Stack
            </div>
            <p className="font-inter text-white/60">
              Build With AI delivers cinematic layouts, on-brand copy, and production-ready code. Orbitron for headings,
              Inter for body, and the signature deep blue → green → yellow brand gradient.
            </p>
            <div className="font-inter text-white/60 text-sm space-y-2">
              <div className="text-white/70">Stay connected with the platform:</div>
              <div className="flex flex-wrap items-center gap-3 text-white/70">
                <Link href="/docs" className="hover:text-white">
                  Docs
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/builder" className="hover:text-white">
                  Builder
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/domains" className="hover:text-white">
                  Domains
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 text-[0.7rem] text-white/50 sm:flex-row sm:items-center">
          <p className="font-inter">© {new Date().getFullYear()} Build With AI. All rights reserved.</p>
          <p className="font-inter text-white/40">Built with cinematic AI experiences in mind.</p>
        </div>
      </div>
    </footer>
  )
}
