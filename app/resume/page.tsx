import { pageMeta } from "@/lib/seo";
import { ResumeView } from "@/views/ResumeView";

export const metadata = pageMeta("Résumé", "Education, experience, projects, leadership, skills, and credentials.", "/resume");

export default function ResumePage() {
  return <ResumeView />;
}
