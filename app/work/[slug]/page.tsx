import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content";
import { pageMeta } from "@/lib/seo";
import { CaseStudyView } from "@/views/CaseStudyView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMeta(`${p.title}: ${p.subtitle}`, p.card, `/work/${p.slug}`);
}

export default async function CaseStudyPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <CaseStudyView project={p} />;
}
