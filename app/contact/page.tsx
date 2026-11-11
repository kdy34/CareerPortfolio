import { contactAvailability } from "@/lib/email";
import { pageMeta } from "@/lib/seo";
import { ContactView } from "@/views/ContactView";

export const metadata = pageMeta("Contact", "Get in touch about AI and data roles, research, or project collaboration.", "/contact");
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return <ContactView mode={contactAvailability()} />;
}
