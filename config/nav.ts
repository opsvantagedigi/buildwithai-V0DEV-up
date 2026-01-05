export type NavLink = {
  label: string
  href: string
  authOnly?: boolean
}

export const headerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "AI Website Builder", href: "/builder" },
  { label: "Features", href: "/features" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Dashboard", href: "/dashboard", authOnly: true },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "AI Website Builder", href: "/builder" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Domains", href: "/domains" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard", authOnly: true },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
]
