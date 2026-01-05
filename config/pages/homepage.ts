import { Page } from "@/lib/layout/schema"

export const homepage: Page = {
  slug: "home",
  title: "Build With AI — AI Website Builder",
  description: "Cinematic AI Website Builder that turns intent into production-ready pages.",
  sections: [
    {
      id: "hero",
      type: "hero",
      eyebrow: "AI WEBSITE BUILDER",
      title: "Build With AI. Create without limits.",
      blocks: [
        {
          kind: "paragraph",
          text: "The cinematic AI Website Builder for founders and teams. Ship production-ready experiences in seconds—without waiting on dev cycles.",
          align: "left",
        },
        {
          kind: "paragraph",
          text: "Backed by a 24/7 AI Operator that watches your funnel and proposes fixes before users notice issues.",
          align: "left",
        },
        {
          kind: "button",
          label: "Start building",
          href: "/builder",
          variant: "primary",
          size: "lg",
        },
        {
          kind: "button",
          label: "Book a call",
          href: "/contact",
          variant: "ghost",
          size: "md",
        },
      ],
    },
    {
      id: "features",
      type: "features",
      title: "Why teams choose Build With AI",
      columns: 3,
      blocks: [
        {
          kind: "iconWithText",
          icon: "⚡",
          text: "AI-powered layout engine",
          subtext: "Generate full page structures from natural language prompts.",
        },
        {
          kind: "iconWithText",
          icon: "🎬",
          text: "Cinematic components",
          subtext: "Hero, feature grids, testimonials, pricing, FAQ, and CTA blocks designed for narrative flow.",
        },
        {
          kind: "iconWithText",
          icon: "🚀",
          text: "Fast Vercel deployment",
          subtext: "Ship to production in minutes with edge-optimized Next.js 16.",
        },
        {
          kind: "iconWithText",
          icon: "🛰️",
          text: "24/7 AI Operator",
          subtext: "Your agent monitors uptime and experience across every funnel.",
        },
        {
          kind: "iconWithText",
          icon: "🧭",
          text: "Builder + dashboard",
          subtext: "Control multi-site portfolios, experiments, and domains from one place.",
        },
        {
          kind: "iconWithText",
          icon: "🛠️",
          text: "Export-friendly",
          subtext: "Own your code, extend components, and integrate with your stack.",
        },
      ],
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: "Founders ship faster with Build With AI",
      columns: 2,
      blocks: [
        {
          kind: "quote",
          quote: "We went from prompt to production-ready launch page before lunch. The cinematic blocks sold our vision instantly.",
          author: "Lena, Founder @ Nova Labs",
          role: "Pre-seed SaaS",
        },
        {
          kind: "quote",
          quote: "Design, copy, and layout all landed in one pass. Editing the generated sections felt like directing a film, not writing code.",
          author: "Marcus, Creative Director",
          role: "Boutique agency",
        },
        {
          kind: "quote",
          quote: "Our ops team loves the AI Operator. It flags issues and proposes fixes before customers notice.",
          author: "Priya, CTO @ Relay",
          role: "Growth stage platform",
        },
      ],
    },
    {
      id: "pricing",
      type: "pricing",
      title: "Pricing that scales with you",
      columns: 3,
      blocks: [
        {
          kind: "stat",
          value: "$29/mo",
          label: "Launch — for solo builders. Includes AI layouts, custom domains, and email support.",
        },
        {
          kind: "stat",
          value: "$99/mo",
          label: "Scale — for growing teams. Adds multi-site dashboard, advanced theming, and priority support.",
        },
        {
          kind: "stat",
          value: "Custom",
          label: "Enterprise — bespoke controls, SSO, SLAs, and dedicated AI Operator tuning.",
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Frequently asked questions",
      blocks: [
        {
          kind: "faqItem",
          question: "What does Build With AI do?",
          answer: "It converts your intent and brand cues into cinematic, production-ready Next.js pages with a registry of reusable sections and blocks.",
        },
        {
          kind: "faqItem",
          question: "How does the AI Operator work?",
          answer: "The Operator monitors uptime, errors, and logs. Today it diagnoses issues and proposes fixes; future releases add guarded autonomous remediation.",
        },
        {
          kind: "faqItem",
          question: "Can I deploy to my own Vercel account?",
          answer: "Yes. Projects ship on Vercel with edge-ready assets. You own the deployment, domains, and environment configuration.",
        },
        {
          kind: "faqItem",
          question: "Do I keep control of the code?",
          answer: "Absolutely. Everything is standard Next.js and Tailwind, so you can extend, fork, or export without lock-in.",
        },
        {
          kind: "faqItem",
          question: "Does the Operator cover observability?",
          answer: "It watches uptime, error rates, and performance, and can hook into your existing observability stack for alerts and triage.",
        },
        {
          kind: "faqItem",
          question: "What’s the roadmap?",
          answer: "Upcoming releases include live Operator widgets, scripted chat/video experiences, and autonomous fixes with safe rollback.",
        },
      ],
    },
    {
      id: "cta",
      type: "cta",
      title: "Ready to build your next launch?",
      align: "center",
      blocks: [
        {
          kind: "button",
          label: "Start building",
          href: "/builder",
          variant: "primary",
          size: "lg",
        },
        {
          kind: "button",
          label: "Book a call",
          href: "/contact",
          variant: "secondary",
          size: "md",
        },
      ],
    },
    {
      id: "agent-showcase",
      type: "agentShowcase",
      title: "Meet your AI Operator",
      blocks: [
        {
          kind: "paragraph",
          text: "Your always-on AI Operator greets visitors, narrates updates, and adapts its tone to your brand across chat and live embeds.",
        },
        {
          kind: "list",
          items: [
            "Delivers scripted intros or real-time responses tuned to your product.",
            "Designed to live in widget, embed, or full-page takeovers—no homepage video required.",
            "Built for brand safety with mode-aware guardrails.",
          ],
          variant: "bulleted",
        },
      ],
    },
    {
      id: "agent-support",
      type: "agentSupport",
      title: "24/7 monitoring and support",
      blocks: [
        {
          kind: "list",
          items: [
            "Monitors uptime, latency, and error spikes across your stack.",
            "Mode B today: diagnoses issues and proposes fixes for human review.",
            "Planned Mode C: guarded autonomous fixes with rollback and audit trail.",
            "Integrates with your observability tools and incident workflows.",
          ],
        },
        {
          kind: "paragraph",
          text: "You stay in control with review flows now, and can opt into autonomous remediation when ready.",
        },
      ],
    },
  ],
}
