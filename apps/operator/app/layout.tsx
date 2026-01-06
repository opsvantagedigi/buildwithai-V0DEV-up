import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  title: "Operator App",
  description: "Operator App for Build With AI",
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#040711", color: "#e5e7eb", fontFamily: "Inter, system-ui" }}>
        {children}
      </body>
    </html>
  )
}
