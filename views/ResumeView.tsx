import Link from "next/link";
import { credentials, education, profile, projects, roles, skills } from "@/content";
import { PrintButton } from "@/components/PrintButton";

export function ResumeView() {
  const work = roles.filter((r) => r.group === "work");
  const lead = roles.filter((r) => r.group === "leadership");
  const comm = roles.filter((r) => r.group === "community" || r.group === "development");
  const links = [
    profile.links.linkedin && { label: "LinkedIn", href: profile.links.linkedin, text: profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") },
    profile.links.github && { label: "GitHub", href: profile.links.github, text: profile.links.github.replace(/^https?:\/\//, "") },
    profile.links.medium && { label: "Medium", href: profile.links.medium, text: profile.links.medium.replace(/^https?:\/\//, "") },
    profile.links.email && { label: "Email", href: `mailto:${profile.links.email}`, text: profile.links.email },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

  return (
    <div className="container resume-wrap">
      <div className="resume-toolbar no-print">
        <p className="mono muted">Web résumé</p>
        <div className="cta-row">
          {profile.links.resumePdf && (
            <a href={profile.links.resumePdf} className="btn btn-ghost btn-small" download>
              Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <article className="resume" aria-labelledby="r-name">
        <header className="resume-head">
          <h1 id="r-name">{profile.name}</h1>
          <p>AI Engineer · Data and cloud focused · {profile.location}</p>
          {links.length > 0 && (
            <ul className="resume-links">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    <span className="mono">{l.label}</span> {l.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        <section aria-labelledby="re-edu">
          <h2 id="re-edu">Education</h2>
          {education.map((e) => (
            <div key={e.school} className="r-item">
              <div className="r-line">
                <h3>{e.degree}</h3>
                <span className="r-date">{e.period}</span>
              </div>
              <p className="r-org">
                {e.school} · {e.place}
              </p>
              <ul>
                {e.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="re-exp">
          <h2 id="re-exp">Experience</h2>
          {work.map((r) => (
            <RoleItem key={r.org + r.title} r={r} />
          ))}
        </section>

        <section aria-labelledby="re-proj">
          <h2 id="re-proj">Selected projects</h2>
          {projects.map((p) => (
            <div key={p.slug} className="r-item">
              <div className="r-line">
                <h3>
                  <Link href={`/work/${p.slug}`}>{p.title}</Link> <span className="r-sub">· {p.subtitle}</span>
                </h3>
                <span className="r-date">{p.type}</span>
              </div>
              <p>{p.card}</p>
              <p className="r-org">My role: {p.role}. {p.tech.join(", ")}.</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="re-lead">
          <h2 id="re-lead">Leadership</h2>
          {lead.map((r) => (
            <RoleItem key={r.org + r.title} r={r} />
          ))}
        </section>

        <section aria-labelledby="re-skills">
          <h2 id="re-skills">Technical skills</h2>
          <dl className="r-skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
            <div>
              <dt>Languages</dt>
              <dd>{profile.languages.join(", ")}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="re-cred">
          <h2 id="re-cred">Certifications and courses</h2>
          <ul className="r-creds">
            {credentials.map((c) => (
              <li key={c.name}>
                <strong>{c.name}</strong> · {c.issuer} · {c.date} <span className="r-kind">({c.kind.toLowerCase()})</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="re-comm">
          <h2 id="re-comm">Community and professional development</h2>
          <ul className="r-creds">
            {comm.map((r) => (
              <li key={r.org}>
                <strong>{r.title}</strong>, {r.org}
                {r.period && ` · ${r.period}`}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

function RoleItem({ r }: { r: (typeof roles)[number] }) {
  return (
    <div className="r-item">
      <div className="r-line">
        <h3>{r.title}</h3>
        <span className="r-date">{r.period}</span>
      </div>
      <p className="r-org">
        {r.org} · {r.place}
      </p>
      <ul>
        {r.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
