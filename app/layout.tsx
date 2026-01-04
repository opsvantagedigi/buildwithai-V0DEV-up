import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Build with AI",
  description: "AI-powered website builder dashboard",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
