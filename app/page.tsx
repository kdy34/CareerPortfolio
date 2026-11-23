import type { Metadata } from "next";
import { openGraphBase, siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: { ...openGraphBase, title: siteTitle, description: siteDescription, url: "/" },
};

export default function HomePage() {
  return <HomeView />;
}
