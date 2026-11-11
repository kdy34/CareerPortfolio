import type { MetadataRoute } from "next";
import { projects } from "@/content";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl ?? "http://localhost:3000";
  const paths = ["", "/work", "/research", "/about", "/resume", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
