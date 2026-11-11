import { pageMeta } from "@/lib/seo";
import { AboutView } from "@/views/AboutView";

export const metadata = pageMeta("About", "From software engineering in Istanbul to AI engineering in Washington, DC.", "/about");

export default function AboutPage() {
  return <AboutView />;
}
