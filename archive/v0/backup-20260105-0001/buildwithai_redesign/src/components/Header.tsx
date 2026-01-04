import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-4">
        <div className="flex items-center justify-between gap-4 lg:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-brand-blue via-brand-purple to-brand-pink shadow-lg ring-2 ring-white/20">
              <img src="/icon.svg" alt="Build With AI" className="h-5 w-5" />
            </span>
            <span className="text-xs font-orbitron font-semibold tracking-[0.3em] text-white/80 sm:text-sm">
              BUILD WITH AI
            </span>
          </Link>
        </div>

        <nav className="font-inter text-xs text-white/70 sm:text-sm">
          <div className="hidden items-center gap-8 lg:flex">
            <div className="group relative">
              <button className="inline-flex items-center gap-1 text-white/80 hover:text-white">
                <span>AI Builder</span>
                <span className="text-[0.6rem] text-white/60">▾</span>
              </button>
              <div className="invisible absolute left-0 top-full mt-3 w-[320px] rounded-2xl border border-white/5 bg-slate-950/95 p-4 text-xs opacity-0 shadow-xl backdrop-blur-xl transition duration-150 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                      Products
                    </div>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <Link href="/ai-website-builder" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                          AI Website Builder
                        </Link>
                      </li>
                      <li>
                        <Link href="/ecommerce-ai-builder" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                          E-commerce AI Builder
                        </Link>
                      </li>
                      <li>
                        <Link href="/wordpress-ai-builder" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                          WordPress AI Builder
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                      Features
                    </div>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <Link href="/managed-wordpress-hosting" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                          Managed WordPress Hosting
                        </Link>
                      </li>
                      <li>
                        <Link href="/free-domain" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                          FREE Domain
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <button className="inline-flex items-center gap-1 text-white/80 hover:text-white">
                <span>AI Tools</span>
                <span className="text-[0.6rem] text-white/60">▾</span>
              </button>
              <div className="invisible absolute left-0 top-full mt-3 w-64 rounded-2xl border border-white/5 bg-slate-950/95 p-4 text-xs opacity-0 shadow-xl backdrop-blur-xl transition duration-150 group-hover:visible group-hover:opacity-100">
                <ul className="space-y-1">
                  <li>
                    <Link href="/ai-tools/logo-maker" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Logo Maker
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/business-name-generator" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Business Name Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/slogan-generator" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Slogan Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/mission-statement-generator" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Mission Statement Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/vision-statement-generator" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Vision Statement Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/industry-explorer" className="block rounded-md px-2 py-1.5 hover:bg-white/5 hover:text-white">
                      Industry Explorer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/pricing" className="text-white/80 hover:text-white">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-white/80 hover:text-white">
              My Dashboard
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white">
              Talk to Sales
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-linear-to-r from-brand-blue via-brand-purple to-brand-pink px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-blue/40 transition hover:-translate-y-0.5 hover:shadow-xl sm:px-5 sm:text-sm"
            >
              Get Started for FREE
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 lg:hidden">
            <Link href="/ai-website-builder" className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] text-white/80">
              AI Builder
            </Link>
            <Link href="/ai-tools" className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] text-white/80">
              AI Tools
            </Link>
            <Link href="/pricing" className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] text-white/80">
              Pricing
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem] text-white/80">
              My Dashboard
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-linear-to-r from-brand-blue via-brand-purple to-brand-pink px-3 py-1 text-[0.7rem] font-semibold text-white shadow-lg shadow-brand-blue/40"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
