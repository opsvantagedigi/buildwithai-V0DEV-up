"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isAiBuilderOpen, setIsAiBuilderOpen] = useState(false);
  const [isAiToolsOpen, setIsAiToolsOpen] = useState(false);

  const closeMenus = () => {
    setIsAiBuilderOpen(false);
    setIsAiToolsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-4">
        <div className="flex items-center justify-between gap-4 lg:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-brand-blue via-brand-purple to-brand-pink shadow-lg ring-2 ring-white/20">
              <img src="/icon.svg" alt="Build With AI" className="h-5 w-5" />
            </span>
            <span className="text-xs font-orbitron font-bold tracking-[0.3em] bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] bg-clip-text text-transparent sm:text-sm">
              BUILD WITH AI
            </span>
          </Link>
        </div>

        <nav className="font-inter text-xs text-white/70 sm:text-sm">
          <div className="hidden items-center gap-8 lg:flex">
            <div className="relative">
              <button
                type="button"
                tabIndex={0}
                className="inline-flex items-center gap-1 text-white/80 hover:text-white focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isAiBuilderOpen}
                onClick={() => setIsAiBuilderOpen((open) => !open)}
                onBlur={closeMenus}
              >
                <span>AI Builder</span>
                <span className="text-[0.6rem] text-white/60">▾</span>
              </button>
              <div
                className={`absolute left-0 top-full mt-3 w-[320px] rounded-md bg-white p-4 text-xs text-slate-900 shadow-lg ring-1 ring-black/5 transition duration-150 z-50 ${
                  isAiBuilderOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Products
                    </div>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <Link href="/ai-website-builder" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                          AI Website Builder
                        </Link>
                      </li>
                      <li>
                        <Link href="/ecommerce-ai-builder" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                          E-commerce AI Builder
                        </Link>
                      </li>
                      <li>
                        <Link href="/wordpress-ai-builder" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                          WordPress AI Builder
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Features
                    </div>
                    <ul className="mt-2 space-y-1">
                      <li>
                        <Link href="/managed-wordpress-hosting" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                          Managed WordPress Hosting
                        </Link>
                      </li>
                      <li>
                        <Link href="/free-domain" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                          FREE Domain
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                tabIndex={0}
                className="inline-flex items-center gap-1 text-white/80 hover:text-white focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isAiToolsOpen}
                onClick={() => setIsAiToolsOpen((open) => !open)}
                onBlur={closeMenus}
              >
                <span>AI Tools</span>
                <span className="text-[0.6rem] text-white/60">▾</span>
              </button>
              <div
                className={`absolute left-0 top-full mt-3 w-64 rounded-md bg-white p-4 text-xs text-slate-900 shadow-lg ring-1 ring-black/5 transition duration-150 z-50 ${
                  isAiToolsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="space-y-1">
                  <li>
                    <Link href="/ai-tools/logo-maker" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                      Logo Maker
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/business-name-generator" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                      Business Name Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/slogan-generator" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                      Slogan Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/mission-statement-generator" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                      Mission Statement Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/vision-statement-generator" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
                      Vision Statement Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-tools/industry-explorer" className="block rounded-md px-2 py-1.5 hover:bg-slate-100">
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
              className="rounded-full bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-4 py-2 text-xs font-orbitron font-bold text-white shadow-lg shadow-brand-blue/40 transition hover:opacity-90 focus:outline-none sm:px-5 sm:text-sm"
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
              className="rounded-full bg-linear-to-r from-[#4f7cff] via-[#2ee6a6] to-[#ffd166] px-3 py-1 text-[0.7rem] font-orbitron font-bold text-white shadow-lg shadow-brand-blue/40 hover:opacity-90 focus:outline-none"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
