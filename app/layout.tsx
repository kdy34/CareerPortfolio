import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/content";
import { PersonJsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { indexable, openGraphBase, siteDescription, siteTitle, siteUrl, twitterBase } from "@/lib/seo";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: siteTitle, template: `%s · ${profile.name}` },
  description: siteDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  openGraph: { ...openGraphBase, title: siteTitle, description: siteDescription },
  twitter: { ...twitterBase, title: siteTitle, description: siteDescription },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#F6F7F9", colorScheme: "light" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
        <PersonJsonLd siteUrl={siteUrl} />
      </body>
    </html>
  );
}
