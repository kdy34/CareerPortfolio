/**
 * Content model. Every visitor-facing string lives in content/<locale>/.
 * To add Turkish later, copy content/en to content/tr, translate the
 * strings, and register it in content/index.ts. Slugs stay ASCII and
 * shared across locales.
 */

export type Locale = "en";

export type LinkKind = "linkedin" | "github" | "email" | "medium" | "resumePdf";

export interface SiteProfile {
  name: string; // visible spelling, keep diacritics
  shortMark: string; // typographic mark used until a headshot exists
  role: string;
  location: string; // public location only
  eyebrow: string;
  headline: string;
  intro: string;
  proof: { label: string; value: string }[];
  languages: string[];
  /** Leave a value empty to hide that link everywhere. */
  links: Record<LinkKind, string>;
  /** Optional: path under /public, e.g. "/headshot.jpg". Empty uses the KD mark. */
  headshot: string;
  /** Optional dated availability flag, e.g. "Open to Summer 2027 internships". Empty hides it. */
  availability: string;
}

export type ProjectType =
  | "Personal project"
  | "Team capstone"
  | "Team course project"
  | "Course project"
  | "Research in progress"
  | "Product concept";

export interface ProjectLink {
  label: "View code" | "Live demo" | "Read notes";
  href: string;
}

export interface Tradeoff {
  title: string;
  chose: string;
  cost: string;
}

export interface Project {
  slug: string; // ASCII
  title: string;
  subtitle: string;
  type: ProjectType;
  status: string;
  period: string;
  role: string;
  card: string; // card copy
  problem: string;
  tech: string[]; // first three show on cards
  visual: "careergenai" | "becayis" | "receptionist";
  accent: "cyan" | "iris" | "mint";
  overview: string[];
  constraints: string[];
  myRole: string[];
  teamNote?: string;
  systemDesign: {
    intro: string;
    steps: { name: string; detail: string }[];
    textEquivalent: string;
  };
  tradeoffs: Tradeoff[];
  canShow: { title: string; body: string }[];
  next: string[];
  links: ProjectLink[]; // only real, approved destinations
}

export interface Experiment {
  title: string;
  href?: string; // public repository or write-up
  type: ProjectType;
  methods: string;
  summary: string;
  tags: string[];
}

export interface Role {
  org: string;
  title: string;
  place: string;
  period: string;
  points: string[];
  /** One verified result shown on the homepage. */
  highlight?: string;
  group: "work" | "leadership" | "community" | "development";
}

export interface Education {
  school: string;
  degree: string;
  place: string;
  period: string;
  notes: string[];
}

export interface Credential {
  name: string;
  issuer: string;
  kind: "Certification" | "Course certificate";
  date: string;
  url?: string;
}

export interface TimelineItem {
  year: string;
  place: "Istanbul" | "Washington, DC";
  title: string;
  detail: string;
}
