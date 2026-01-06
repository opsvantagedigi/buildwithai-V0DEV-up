// lib/layout/schema.ts
// Core content schema for AI-generated pages: blocks, sections, and pages.

export type Block =
  | HeadingBlock
  | SubheadingBlock
  | ParagraphBlock
  | ListBlock
  | StatBlock
  | IconWithTextBlock
  | ImageBlock
  | VideoBlock
  | ButtonBlock
  | QuoteBlock
  | FAQItemBlock

export type BlockKind = Block["kind"]

export type HeadingBlock = {
  kind: "heading"
  text: string
  level?: 1 | 2 | 3 | 4
  align?: "left" | "center" | "right"
}

export type SubheadingBlock = {
  kind: "subheading"
  text: string
  align?: "left" | "center" | "right"
}

export type ParagraphBlock = {
  kind: "paragraph"
  text: string
  align?: "left" | "center" | "right"
}

export type ListBlock = {
  kind: "list"
  items: string[]
  variant?: "bulleted" | "numbered" | "inline"
}

export type StatBlock = {
  kind: "stat"
  value: string
  label: string
  icon?: string
}

export type IconWithTextBlock = {
  kind: "iconWithText"
  icon: string
  text: string
  subtext?: string
}

export type ImageBlock = {
  kind: "image"
  src: string
  alt: string
  aspectRatio?: string
  rounded?: boolean
}

export type VideoBlock = {
  kind: "video"
  src: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export type ButtonBlock = {
  kind: "button"
  label: string
  href: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export type QuoteBlock = {
  kind: "quote"
  quote: string
  author?: string
  role?: string
}

export type FAQItemBlock = {
  kind: "faqItem"
  question: string
  answer: string
}

export type SectionType =
  | "hero"
  | "features"
  | "testimonials"
  | "pricing"
  | "faq"
  | "cta"
  | "agentShowcase"
  | "agentSupport"

export type BaseSection<T extends SectionType = SectionType> = {
  id?: string
  type: T
  blocks: Block[]
  eyebrow?: string
  title?: string
  layout?: string
  theme?: "light" | "dark" | "brand"
}

export type HeroSection = BaseSection<"hero"> & {
  backgroundImage?: string
  highlight?: string
}

export type FeaturesSection = BaseSection<"features"> & {
  columns?: 2 | 3 | 4
}

export type TestimonialsSection = BaseSection<"testimonials"> & {
  columns?: 2 | 3
}

export type PricingSection = BaseSection<"pricing"> & {
  columns?: 2 | 3 | 4
}

export type FAQSection = BaseSection<"faq">

export type CTASection = BaseSection<"cta"> & {
  align?: "left" | "center"
}

export type AgentShowcaseSection = BaseSection<"agentShowcase"> & {
  showVideo?: boolean
  showImage?: boolean
}

export type AgentSupportSection = BaseSection<"agentSupport">

export type Section =
  | HeroSection
  | FeaturesSection
  | TestimonialsSection
  | PricingSection
  | FAQSection
  | CTASection
  | AgentShowcaseSection
  | AgentSupportSection

export type Page = {
  slug: string
  title: string
  description?: string
  sections: Section[]
}
