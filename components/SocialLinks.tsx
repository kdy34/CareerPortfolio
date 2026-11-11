import { profile } from "@/content";

const LABELS = { linkedin: "LinkedIn", github: "GitHub", medium: "Medium", email: "Email" } as const;

/** Renders only links that have a real value in content/en/site.ts. */
export function SocialLinks({ className = "social-links" }: { className?: string }) {
  const items = (Object.keys(LABELS) as (keyof typeof LABELS)[])
    .filter((k) => profile.links[k])
    .map((k) => ({
      key: k,
      label: LABELS[k],
      href: k === "email" ? `mailto:${profile.links.email}` : profile.links[k],
      text: k === "email" ? profile.links.email : LABELS[k],
    }));
  if (!items.length) return null;
  return (
    <ul className={className}>
      {items.map((i) => (
        <li key={i.key}>
          <a href={i.href} {...(i.key !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {i.text}
            {i.key !== "email" && <span className="sr-only"> (opens in a new tab)</span>}
            <span aria-hidden="true" className="ext">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
