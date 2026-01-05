"use client"

import React from "react"
import { Block, Page, Section } from "@/lib/layout/schema"

import { HeroSection } from "@/components/sections/HeroSection"
import { FeatureGridSection } from "@/components/sections/FeatureGridSection"
import { TestimonialSection } from "@/components/sections/TestimonialSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { CTASection } from "@/components/sections/CTASection"
import { AgentShowcaseSection } from "@/components/sections/AgentShowcaseSection"
import { AgentSupportSection } from "@/components/sections/AgentSupportSection"

import { HeadingBlock } from "@/components/blocks/HeadingBlock"
import { TextBlock } from "@/components/blocks/TextBlock"
import { ButtonBlock } from "@/components/blocks/ButtonBlock"
import { VideoBlock } from "@/components/blocks/VideoBlock"
import { IconRowBlock } from "@/components/blocks/IconRowBlock"
import { StatBlock } from "@/components/blocks/StatBlock"
import { FAQItemBlock } from "@/components/blocks/FAQItemBlock"
import { ImageBlock } from "@/components/blocks/ImageBlock"
import { ListBlock } from "@/components/blocks/ListBlock"
import { QuoteBlock } from "@/components/blocks/QuoteBlock"

const BLOCK_COMPONENTS: Record<Block["kind"], React.ComponentType<{ block: Block }>> = {
  heading: HeadingBlock,
  subheading: HeadingBlock,
  paragraph: TextBlock,
  list: ListBlock,
  stat: StatBlock,
  iconWithText: IconRowBlock,
  image: ImageBlock,
  video: VideoBlock,
  button: ButtonBlock,
  quote: QuoteBlock,
  faqItem: FAQItemBlock,
}

function BlockRenderer({ block }: { block: Block }) {
  const Component = BLOCK_COMPONENTS[block.kind]
  if (!Component) return null
  return <Component block={block} />
}

const SECTION_COMPONENTS: Record<Section["type"], React.ComponentType<{ section: Section }>> = {
  hero: HeroSection,
  features: FeatureGridSection,
  testimonials: TestimonialSection,
  pricing: PricingSection,
  faq: FAQSection,
  cta: CTASection,
  agentShowcase: AgentShowcaseSection,
  agentSupport: AgentSupportSection,
}

function SectionRenderer({ section }: { section: Section }) {
  const Component = SECTION_COMPONENTS[section.type]
  if (!Component) return null
  return <Component section={section} />
}

export function LayoutRenderer({ page }: { page: Page }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {page.sections.map((section, index) => (
        <SectionRenderer key={section.id ?? `${section.type}-${index}`} section={section} />
      ))}
    </main>
  )
}

export { BlockRenderer }
