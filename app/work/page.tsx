import { pageMeta } from "@/lib/seo";
import { WorkView } from "@/views/WorkView";

export const metadata = pageMeta("Work", "Case studies and experiments in LLM applications, optimization, human–robot interaction, and data engineering.", "/work");

export default function WorkPage() {
  return <WorkView />;
}
