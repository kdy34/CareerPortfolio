import Link from "next/link";
import { projects, type Project } from "@/content";
import { CareerSample } from "@/components/CareerSample";
import { Pipeline } from "@/components/Pipeline";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";

export function CaseStudyView({ project }: { project: Project }) {
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  return (
    <article className={`case accent-${project.accent}`} aria-labelledby="case-title">
      <header className="case-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb mono">
            <Link href="/work">Work</Link> <span aria-hidden="true">/</span> <span aria-current="page">{project.title}</span>
          </nav>
          <div className="case-hero-grid">
            <div>
              <p className="eyebrow mono">{project.subtitle}</p>
              <h1 id="case-title" className="display">
                {project.title}
              </h1>
              <p className="lede">{project.card}</p>
            </div>
            <dl className="case-meta">
              <div>
                <dt className="mono label">Type</dt>
                <dd>{project.type}</dd>
              </div>
              <div>
                <dt className="mono label">Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt className="mono label">My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt className="mono label">Stack</dt>
                <dd>{project.tech.join(", ")}</dd>
              </div>
              {project.links.length > 0 && (
                <div>
                  <dt className="mono label">Links</dt>
                  <dd className="case-links">
                    {project.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="case-visual">
            <ProjectVisual kind={project.visual} title={project.title} />
          </div>
        </div>
      </header>

      <div className="container case-body">
        <section aria-labelledby="s-problem" className="case-section">
          <h2 id="s-problem" className="case-h">The problem</h2>
          <div className="prose">
            <p>{project.problem}</p>
            {project.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="s-constraints" className="case-section">
          <h2 id="s-constraints" className="case-h">Constraints</h2>
          <ul className="prose list">
            {project.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="s-role" className="case-section">
          <h2 id="s-role" className="case-h">My role</h2>
          <div className="prose">
            <ul className="list">
              {project.myRole.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {project.teamNote && <p className="team-note">{project.teamNote}</p>}
          </div>
        </section>

        <section aria-labelledby="s-design" className="case-section wide">
          <h2 id="s-design" className="case-h">System design</h2>
          <div>
            <p className="prose">{project.systemDesign.intro}</p>
            <Pipeline project={project} />
          </div>
        </section>

        <section aria-labelledby="s-trade" className="case-section">
          <h2 id="s-trade" className="case-h">Tradeoffs</h2>
          <div className="tradeoffs">
            {project.tradeoffs.map((t) => (
              <div key={t.title} className="tradeoff">
                <h3 className="h4">{t.title}</h3>
                <p>
                  <span className="mono label">Why</span> {t.chose}
                </p>
                <p className="muted">
                  <span className="mono label">Cost</span> {t.cost}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="s-show" className="case-section wide">
          <h2 id="s-show" className="case-h">What I can show</h2>
          <div>
            <div className="show-grid">
              {project.canShow.map((c) => (
                <div key={c.title} className="show-item">
                  <h3 className="h4">{c.title}</h3>
                  <p className="muted">{c.body}</p>
                </div>
              ))}
            </div>
            {project.slug === "careergenai" && <CareerSample />}
          </div>
        </section>

        <section aria-labelledby="s-next" className="case-section">
          <h2 id="s-next" className="case-h">What I would explore next</h2>
          <ul className="prose list">
            {project.next.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>

      <nav className="container case-next" aria-label="More case studies">
        <Link href={`/work/${next.slug}`} className="next-link">
          <span className="mono label">Next case study</span>
          <span className="next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Ask me about this project
        </Link>
      </nav>
    </article>
  );
}
