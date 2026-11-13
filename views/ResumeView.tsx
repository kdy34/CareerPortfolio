import Link from "next/link";
import { profile, resumeDocument as r } from "@/content";
import { PrintButton } from "@/components/PrintButton";

/** Mirrors the PDF résumé word for word (phone number left off the web page). */
export function ResumeView() {
  return (
    <div className="container resume-wrap">
      <div className="resume-toolbar no-print">
        <p className="mono muted">Résumé</p>
        <div className="cta-row">
          {profile.links.resumePdf && (
            <a href={profile.links.resumePdf} className="btn btn-primary btn-small" download>
              Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <article className="resume" aria-labelledby="r-name">
        <header className="resume-head centered">
          <h1 id="r-name">{r.name}</h1>
          <p className="resume-contact">
            <span>{r.location}</span>
            <span aria-hidden="true"> • </span>
            <a href={`mailto:${r.email}`}>{r.email}</a>
            {r.links.map((l) => (
              <span key={l.label}>
                <span aria-hidden="true"> • </span>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
          <p className="resume-headline">{r.headline}</p>
        </header>

        <section aria-labelledby="re-sum">
          <h2 id="re-sum">Summary</h2>
          <p>{r.summary}</p>
        </section>

        <section aria-labelledby="re-exp">
          <h2 id="re-exp">Professional Experience</h2>
          {r.experience.map((e) => (
            <div key={e.title} className="r-item">
              <div className="r-line">
                <h3>{e.title}</h3>
                <span className="r-date">{e.dates}</span>
              </div>
              <p className="r-org r-right">{e.place}</p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="re-edu">
          <h2 id="re-edu">Education</h2>
          {r.education.map((e) => (
            <div key={e.school} className="r-item">
              <div className="r-line">
                <h3>{e.school}</h3>
                <span className="r-date">{e.dates}</span>
              </div>
              <div className="r-line">
                <p className="r-org">{e.degree}</p>
                <p className="r-org">{e.note}</p>
              </div>
            </div>
          ))}
        </section>

        <section aria-labelledby="re-proj">
          <h2 id="re-proj">Projects</h2>
          {r.projects.map((p) => (
            <div key={p.title} className="r-item">
              <h3>
                <Link href={`/work/${p.slug}`}>{p.title}</Link>
              </h3>
              <ul>
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="re-skills">
          <h2 id="re-skills" className="sr-only">
            Skills
          </h2>
          <p>
            <strong>Technical Skills:</strong> {r.technicalSkills}
          </p>
          <p>
            <strong>Core Competencies:</strong> {r.coreCompetencies}
          </p>
        </section>

        <section aria-labelledby="re-cert">
          <h2 id="re-cert">Certifications</h2>
          <ul className="r-list">
            {r.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="re-vol">
          <h2 id="re-vol">Volunteering</h2>
          <ul className="r-list">
            {r.volunteering.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="re-lang">
          <h2 id="re-lang">Languages</h2>
          <p>{r.languages}</p>
        </section>
      </article>
    </div>
  );
}
