import Link from "next/link";
import type { Project } from "@/content";
import { ProjectVisual } from "./visuals/ProjectVisual";

export function ProjectCard({ project, index, headingLevel = 3 }: { project: Project; index: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const id = `card-${project.slug}`;
  return (
    <article className={`project-card accent-${project.accent}`} aria-labelledby={id}>
      <div className="project-card-visual">
        <ProjectVisual kind={project.visual} />
      </div>
      <div className="project-card-body">
        <p className="eyebrow mono">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.type}</span>
          <span>{project.status}</span>
        </p>
        <H id={id} className="project-title">
          {project.title}
          <span className="project-subtitle">{project.subtitle}</span>
        </H>
        <p>{project.card}</p>
        <p className="project-problem">
          <span className="mono label">Problem</span> {project.problem}
        </p>
        <ul className="tags" aria-label="Key technologies">
          {project.tech.slice(0, 3).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="card-actions">
          <Link href={`/work/${project.slug}`} className="card-link">
            Read case study<span className="sr-only">: {project.title}</span> <span aria-hidden="true">→</span>
          </Link>
          {project.links.map((l) => (
            <a key={l.href} href={l.href} className="card-secondary" target="_blank" rel="noopener noreferrer">
              {l.label}
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
