import { pageMeta } from "@/lib/seo";
import { ResearchView } from "@/views/ResearchView";

export const metadata = pageMeta("Research", "Graduate research on prompt injection in cloud-deployed LLM applications and defense-in-depth strategies.", "/research");

export default function ResearchPage() {
  return <ResearchView />;
}
