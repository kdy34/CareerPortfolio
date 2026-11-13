import Image from "next/image";
import Link from "next/link";
import { capabilities, profile, projects, research, roles } from "@/content";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroDiagram } from "@/components/visuals/HeroDiagram";

export function HomeView() {
  const highlights = roles.filter((r) => ["Panasonic", "Huawei"].includes(r.org) || r.title.startsWith("Vice President"));
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow mono">{profile.eyebrow}</p>
            <p className="hero-name">
              {profile.headshot && (
                <Image src={profile.headshot} alt="" width={720} height={900} className="hero-avatar" sizes="56px" priority />
              )}
              <span>{profile.name}</span>
            </p>
            <h1 id="hero-title" className="display">
              {profile.headline}
            </h1>
            <p className="lede">{profile.intro}</p>
            <div className="cta-row">
              <Link href="/#selected-work" className="btn btn-primary">
                Explore my work <span aria-hidden="true">↓</span>
              </Link>
              <Link href="/resume" className="btn btn-ghost">
                View résumé
              </Link>
            </div>
            {profile.availability && <p className="availability mono">{profile.availability}</p>}
          </div>
          <div className="hero-visual">
            <HeroDiagram />
          </div>
        </div>
        <div className="container">
          <ul className="proof-strip" aria-label="Highlights">
            {profile.proof.map((p) => (
              <li key={p.label}>
                <span className="mono label">{p.label}</span>
                <span>{p.value}</span>
              </li>
            ))}
          </ul>
          <a href="#selected-work" className="scroll-cue mono">
            See what I have built <span aria-hidden="true" className="scroll-cue-line" />
          </a>
        </div>
      </section>

      <section id="selected-work" className="section" aria-labelledby="work-title" tabIndex={-1}>
        <div className="container">
          <header className="section-head">
            <p className="eyebrow mono">Selected work</p>
            <h2 id="work-title" className="h2">Three projects, three kinds of problems.</h2>
            <p className="muted section-intro">An LLM application, an optimization capstone, and a human–robot interaction prototype. Each case study separates what I did from what the team did.</p>
          </header>
          <div className="project-list">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <p className="section-foot">
            <Link href="/work" className="text-link">
              All projects and experiments <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-research" aria-labelledby="research-title">
        <div className="container research-teaser">
          <div>
            <p className="eyebrow mono iris">
              <span className="dot" aria-hidden="true" /> {research.status}
            </p>
            <h2 id="research-title" className="h2">{research.title}</h2>
          </div>
          <div>
            <blockquote className="question">{research.question}</blockquote>
            <p className="muted">{research.intro}</p>
            <Link href="/research" className="text-link">
              Read about the research <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="areas-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow mono">Areas I work in</p>
            <h2 id="areas-title" className="h2">Where the model meets the product.</h2>
          </header>
          <ul className="capabilities">
            {capabilities.map((c, i) => (
              <li key={c.title} className={`capability signal-${c.signal}`}>
                <span className="mono cap-index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{c.title}</h3>
                <p className="muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="exp-title">
        <div className="container">
          <header className="section-head split">
            <div>
              <p className="eyebrow mono">Experience and leadership</p>
              <h2 id="exp-title" className="h2">Industry internships, campus leadership.</h2>
            </div>
            <Link href="/about" className="text-link">
              My path from Istanbul to Washington <span aria-hidden="true">→</span>
            </Link>
          </header>
          <ol className="exp-rows">
            {highlights.map((r) => (
              <li key={r.org + r.title}>
                <span className="mono muted">{r.period}</span>
                <span className="exp-org">{r.org}</span>
                <span className="exp-role">
                  <span>{r.title}</span>
                  {r.highlight && <span className="exp-highlight">{r.highlight}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cta-final" aria-labelledby="cta-title">
        <div className="container cta-final-inner">
          <h2 id="cta-title" className="display-sm">Get in touch</h2>
          <p className="lede">I am open to opportunities in AI engineering, data science, and cloud computing, and to research collaboration.</p>
          <div className="cta-row">
            <Link href="/contact" className="btn btn-primary">
              Send a message
            </Link>
            <Link href="/resume" className="btn btn-ghost">
              View résumé
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
