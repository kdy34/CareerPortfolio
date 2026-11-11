import { experiments, moreProjects, projects, publicCode, profile } from "@/content";
import { ProjectCard } from "@/components/ProjectCard";

export function WorkView() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow mono">Work</p>
          <h1 className="display">Things I’ve built and studied.</h1>
          <p className="lede">Featured case studies first, then smaller projects and course experiments. Every item is labeled by type so it’s clear what was personal, team, or coursework.</p>
        </div>
      </header>

      <section className="section pt-0" aria-labelledby="featured">
        <div className="container">
          <h2 id="featured" className="eyebrow mono section-label">Featured case studies</h2>
          <div className="project-list">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="more">
        <div className="container">
          <header className="section-head">
            <h2 id="more" className="h2">More projects</h2>
          </header>
          <ul className="exp-grid">
            {moreProjects.map((e) => (
              <ExperimentItem key={e.title} e={e} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="code">
        <div className="container">
          <header className="section-head split">
            <div>
              <h2 id="code" className="h2">Public code</h2>
              <p className="muted section-intro">Pinned repositories on my GitHub.</p>
            </div>
            {profile.links.github && (
              <a href={profile.links.github} className="text-link" target="_blank" rel="noopener noreferrer">
                All repositories on GitHub <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </header>
          <ul className="exp-grid">
            {publicCode.map((e) => (
              <ExperimentItem key={e.title} e={e} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="labs">
        <div className="container">
          <header className="section-head">
            <h2 id="labs" className="h2">Selected experiments</h2>
            <p className="muted section-intro">Course labs where I practiced a method end to end. They’re smaller in scope than the case studies and use course or public datasets.</p>
          </header>
          <ul className="exp-grid">
            {experiments.map((e) => (
              <ExperimentItem key={e.title} e={e} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ExperimentItem({ e }: { e: (typeof experiments)[number] }) {
  return (
    <li className="exp-card">
      <p className="mono label">{e.type} · {e.tags.join(" · ")}</p>
      <h3 className="h4">{e.title}</h3>
      <p className="mono methods">{e.methods}</p>
      <p className="muted">{e.summary}</p>
      {e.href && (
        <a href={e.href} className="card-link exp-link" target="_blank" rel="noopener noreferrer">
          View code<span className="sr-only">: {e.title} (opens in a new tab)</span> <span aria-hidden="true">↗</span>
        </a>
      )}
    </li>
  );
}
