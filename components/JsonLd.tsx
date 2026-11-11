import { profile } from "@/content";

export function PersonJsonLd({ siteUrl }: { siteUrl?: string }) {
  const sameAs = [profile.links.linkedin, profile.links.github, profile.links.medium].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(profile.links.email ? { email: `mailto:${profile.links.email}` } : {}),
    ...(siteUrl && profile.headshot ? { image: `${siteUrl}${profile.headshot}` } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Washington, DC", addressCountry: "US" },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Bahçeşehir University" }],
    affiliation: { "@type": "CollegeOrUniversity", name: "Bay Atlantic University" },
    knowsLanguage: profile.languages,
    knowsAbout: ["Machine learning", "Large language models", "Data science", "Cloud computing", "Software engineering"],
    ...(sameAs.length ? { sameAs } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
