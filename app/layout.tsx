import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Build With AI — AI Website Builder",
  description:
    "Cinematic AI website builder for founders, creators, and agencies. Build, deploy, and scale your ideas instantly.",
  metadataBase: new URL("https://buildwithai.digital"),
  openGraph: {
    title: "Build With AI — AI Website Builder",
    description:
      "Cinematic AI website builder for founders, creators, and agencies. Build, deploy, and scale your ideas instantly.",
    url: "https://buildwithai.digital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Build With AI — Cinematic AI Website Builder",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className="min-h-screen bg-background text-foreground antialiased font-sans"
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
