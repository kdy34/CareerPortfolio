import type { Metadata } from "next";
import { profile } from "@/content";

/** The domain in content/en/site.ts wins; the environment variable is only a fallback. */
export const siteUrl = (profile.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "") || undefined;
/** Indexing stays off until you set NEXT_PUBLIC_SITE_INDEXABLE=true at launch. */
export const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: { title: `${title} · ${profile.name}`, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} · ${profile.name}`, description },
  };
}
