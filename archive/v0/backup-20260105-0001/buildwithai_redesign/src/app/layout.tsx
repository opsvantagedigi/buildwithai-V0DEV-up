import type { Metadata } from "next";

import "./globals.css";
import "@/assets/gds.css";
import "@/assets/docs.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body className="antialiased font-inter bg-gradient-brand">
        <Header />
        <div className="pt-20 pb-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
