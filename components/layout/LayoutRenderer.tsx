"use client"

import React from "react"
import { Block, Page, Section } from "@/lib/layout/schema"

import { HeroSection } from "../sections/HeroSection"
import { FeatureGridSection } from "../sections/FeatureGridSection"
import { TestimonialSection } from "../sections/TestimonialSection"
import { PricingSection } from "../sections/PricingSection"
import { FAQSection } from "../sections/FAQSection"
import { CTASection } from "../sections/CTASection"
import { AgentShowcaseSection } from "../sections/AgentShowcaseSection"
import { AgentSupportSection } from "../sections/AgentSupportSection"

import { HeadingBlock } from "../blocks/HeadingBlock"
import { TextBlock } from "../blocks/TextBlock"
import { ButtonBlock } from "../blocks/ButtonBlock"
import { VideoBlock } from "../blocks/VideoBlock"
import { IconRowBlock } from "../blocks/IconRowBlock"
import { StatBlock } from "../blocks/StatBlock"
import { FAQItemBlock } from "../blocks/FAQItemBlock"
import { ImageBlock } from "../blocks/ImageBlock"
import { ListBlock } from "../blocks/ListBlock"
import { QuoteBlock } from "../blocks/QuoteBlock"

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
    <main className="min-h-screen bg-linear-to-b from-black via-slate-950 to-black text-slate-50">
      {page.sections.map((section, index) => (
        <SectionRenderer key={section.id ?? `${section.type}-${index}`} section={section} />
      ))}
    </main>
  )
}

export { BlockRenderer }
