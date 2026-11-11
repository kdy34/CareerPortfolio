import { useEffect, useSyncExternalStore } from "react";
import { getProject, profile } from "@/content";
import { SiteShell } from "@/components/SiteShell";
import { AboutView } from "@/views/AboutView";
import { CaseStudyView } from "@/views/CaseStudyView";
import { ContactView } from "@/views/ContactView";
import { HomeView } from "@/views/HomeView";
import { NotFoundView } from "@/views/NotFoundView";
import { ResearchView } from "@/views/ResearchView";
import { ResumeView } from "@/views/ResumeView";
import { WorkView } from "@/views/WorkView";
import { getRoute, subscribe } from "./router";

// The artifact viewer cannot serve or download PDFs, so the preview hides the download button.
profile.links.resumePdf = "";

const TITLES: Record<string, string> = {
  home: `${profile.name} · AI Engineering & Data Science`,
  work: "Work",
  research: "Research",
  about: "About",
  resume: "Résumé",
  contact: "Contact",
  "not-found": "Page not found",
};

export function PreviewApp() {
  const route = useSyncExternalStore(subscribe, getRoute, () => "home");
  let page;
  let title = TITLES[route];
  if (route.startsWith("work-")) {
    const p = getProject(route.slice(5));
    page = p ? <CaseStudyView key={p.slug} project={p} /> : <NotFoundView />;
    title = p ? `${p.title}: ${p.subtitle}` : TITLES["not-found"];
  } else if (route === "work") page = <WorkView />;
  else if (route === "research") page = <ResearchView />;
  else if (route === "about") page = <AboutView />;
  else if (route === "resume") page = <ResumeView />;
  else if (route === "contact") page = <ContactView key="c" mode="preview" />;
  else if (route === "not-found") page = <NotFoundView />;
  else page = <HomeView />;

  useEffect(() => {
    document.title = route === "home" ? title : `${title} · ${profile.name}`;
  }, [route, title]);

  return <SiteShell>{page}</SiteShell>;
}
