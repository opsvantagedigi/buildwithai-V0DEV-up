import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 text-xs text-white/70 sm:grid-cols-2 md:text-sm lg:grid-cols-5">
          <div className="space-y-3">
            <div className="text-[0.65rem] font-orbitron font-semibold tracking-[0.25em] text-white/60">
              AI BUILDER
            </div>
            <ul className="space-y-1 font-inter">
              <li>
                <Link href="/ai-website-builder" className="hover:text-white">
                  AI Website Builder
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-ai-builder" className="hover:text-white">
                  Ecommerce AI Builder
                </Link>
              </li>
              <li>
                <Link href="/wordpress-ai-builder" className="hover:text-white">
                  WordPress AI Builder
                </Link>
              </li>
              <li>
                <Link href="/managed-wordpress-hosting" className="hover:text-white">
                  Managed WordPress Hosting
                </Link>
              </li>
              <li>
                <Link href="/free-custom-domain" className="hover:text-white">
                  Free Custom Domain
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[0.65rem] font-orbitron font-semibold tracking-[0.25em] text-white/60">
              WP &amp; AI TOOLS
            </div>
            <ul className="space-y-1 font-inter">
              <li>
                <Link href="/pagespeed-booster" className="hover:text-white">
                  PageSpeed Booster
                </Link>
              </li>
              <li>
                <Link href="/wordpress-plugins" className="hover:text-white">
                  WordPress Plugins
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/logo-maker" className="hover:text-white">
                  Logo Maker
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/business-name-generator" className="hover:text-white">
                  Business Name Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/slogan-generator" className="hover:text-white">
                  Slogan Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/mission-statement-generator" className="hover:text-white">
                  Mission Statement Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/vision-statement-generator" className="hover:text-white">
                  Vision Statement Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/industry-explorer" className="hover:text-white">
                  Industry Explorer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[0.65rem] font-orbitron font-semibold tracking-[0.25em] text-white/60">
              BUILD WITH US
            </div>
            <ul className="space-y-1 font-inter">
              <li>
                <Link href="/white-label-website-builder" className="hover:text-white">
                  White Label Website Builder
                </Link>
              </li>
              <li>
                <Link href="/website-builder-api" className="hover:text-white">
                  Website Builder API
                </Link>
              </li>
              <li>
                <Link href="/white-label-reseller-dashboard" className="hover:text-white">
                  White Label Reseller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/self-hosted-solution" className="hover:text-white">
                  Self-hosted Solution for WP Hosts
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-white">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[0.65rem] font-orbitron font-semibold tracking-[0.25em] text-white/60">
              SOLUTIONS &amp; RESOURCES
            </div>
            <ul className="space-y-1 font-inter">
              <li>
                <Link href="/solutions/saas-platforms" className="hover:text-white">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/solutions/hosting-domain-providers" className="hover:text-white">
                  Hosting &amp; Domain Providers
                </Link>
              </li>
              <li>
                <Link href="/solutions/msps-agencies" className="hover:text-white">
                  MSPs &amp; Agencies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/glossaries" className="hover:text-white">
                  Glossaries
                </Link>
              </li>
              <li>
                <Link href="/website-builder-comparisons" className="hover:text-white">
                  Website Builder Comparisons
                </Link>
              </li>
              <li>
                <Link href="/hosting-comparisons" className="hover:text-white">
                  Hosting Comparisons
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="hover:text-white">
                  AI Tools Repository
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white">
                  AI Simplified Newsletter
                </Link>
              </li>
              <li>
                <Link href="/press-kit" className="hover:text-white">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="/public-roadmap" className="hover:text-white">
                  Public Roadmap
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/submit-idea" className="hover:text-white">
                  Submit Your Idea
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[0.65rem] font-orbitron font-semibold tracking-[0.25em] text-white/60">
              COMPANY
            </div>
            <ul className="space-y-1 font-inter">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="hover:text-white">
                  Affiliates
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/report-abuse" className="hover:text-white">
                  Report Abuse
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/trust-center" className="hover:text-white">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 text-[0.7rem] text-white/50 sm:flex-row sm:items-center">
          <p className="font-inter">
            © {new Date().getFullYear()} OpsVantage Digital. All rights reserved.
          </p>
          <p className="font-inter text-white/40">
            Built with cinematic AI experiences in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
