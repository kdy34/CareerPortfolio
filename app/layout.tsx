import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/content";
import { PersonJsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { indexable, siteUrl } from "@/lib/seo";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

const description =
  "Kutay Deniz Yazicioglu is an AI Engineering graduate student in the Washington, DC area who builds machine learning and LLM applications with data pipelines, APIs, and cloud software.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: `${profile.name} · AI Engineering & Data Science`, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  openGraph: { type: "website", siteName: profile.name, title: profile.name, description, locale: "en_US" },
  twitter: { card: "summary_large_image", title: profile.name, description },
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
