import Image from "next/image";
import Link from "next/link";
import { credentials, hobbies, photos, profile, roles, timeline } from "@/content";
import { SocialLinks } from "@/components/SocialLinks";

export function AboutView() {
  const community = roles.filter((r) => r.group === "community");
  const clubs = roles.filter((r) => r.group === "leadership");
  return (
    <>
      <header className="page-hero">
        <div className="container about-hero">
          <div>
            <p className="eyebrow mono">About</p>
            <h1 className="display">I build at the intersection of AI, data, and software.</h1>
          </div>
          <div className={`portrait${profile.headshot ? " has-photo" : ""}`} aria-hidden={profile.headshot ? undefined : true}>
            {profile.headshot ? (
              <Image src={profile.headshot} alt={`Portrait of ${profile.name}`} width={720} height={900} sizes="(max-width: 760px) 60vw, 280px" priority />
            ) : (
              <span className="portrait-mark">{profile.shortMark}</span>
            )}
          </div>
        </div>
      </header>

      <div className="container about-body">
        <div className="prose about-prose">
          <p>
            I’m {profile.name}, an AI Engineering graduate student at Bay Atlantic University in Washington, DC. I studied software engineering at Bahçeşehir University in Istanbul, and an exchange year brought me to Washington before I returned for my master’s. That path gave me two ways into AI work. I care about what a model can do, and I care about the software that makes its output useful.
          </p>
          <p>
            At Panasonic, I worked on business analysis and ERP data workflows. At Huawei, I gained experience with cloud infrastructure. In my own and academic projects, I’ve explored how a career tool can turn a résumé into a learning plan, how optimization can support relocation matching, and how a robot can respond to visitors on campus.
          </p>
          <p>
            Student leadership and volunteering are part of how I stay involved beyond my classes. As Student Government Association vice president, I’ve focused on listening to student feedback and making it easier for students to participate. I bring that same habit to technical projects by asking who will use a system, what they need from it, and how we’ll know it helped.
          </p>
          <p className="muted">I work in English and Turkish, and I’m learning Spanish.</p>
        </div>

        <section aria-labelledby="path" className="about-section">
          <h2 id="path" className="h2">Istanbul → Washington</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year + t.title} data-place={t.place === "Istanbul" ? "ist" : "dc"}>
                <span className="mono t-year">{t.year}</span>
                <span className="mono t-place">{t.place}</span>
                <strong>{t.title}</strong>
                <span className="muted">{t.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="honors" className="about-section">
          <h2 id="honors" className="h2">Honors and credentials</h2>
          <div className="honor">
            <span className="mono label">Honor</span>
            <strong>President’s List, Fall 2025</strong>
            <span className="muted">Bay Atlantic University · Graduate GPA 3.95</span>
          </div>
          <ul className="cred-list">
            {credentials.map((c) => (
              <li key={c.name}>
                <span className={`badge ${c.kind === "Certification" ? "badge-cert" : ""}`}>{c.kind}</span>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.name}
                  </a>
                ) : (
                  <span>{c.name}</span>
                )}
                <span className="muted mono">
                  {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="clubs" className="about-section">
          <h2 id="clubs" className="h2">Clubs and leadership</h2>
          <ul className="mini-list">
            {clubs.map((r) => (
              <li key={r.org + r.title}>
                <strong>{r.title}</strong>
                <span>{r.org}</span>
                <span className="mono muted">{r.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="community" className="about-section">
          <h2 id="community" className="h2">Community</h2>
          <ul className="mini-list">
            {community.map((r) => (
              <li key={r.org}>
                <strong>{r.org}</strong>
                <span>{r.title}</span>
                <span className="mono muted">{r.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="photos" className="about-section">
          <h2 id="photos" className="h2">Around campus and community</h2>
          <ul className="gallery">
            {photos.map((ph) => (
              <li key={ph.src}>
                <figure>
                  <Image src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} sizes="(max-width: 760px) 100vw, 33vw" />
                  <figcaption className="mono">{ph.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="outside" className="about-section">
          <h2 id="outside" className="h2">Outside of work</h2>
          <ul className="hobbies">
            {hobbies.map((h) => (
              <li key={h.title} className={`hobby signal-${h.signal}`}>
                <h3 className="h4">{h.title}</h3>
                <p className="muted">{h.body}</p>
              </li>
            ))}
          </ul>
          {profile.links.medium && (
            <p>
              <a href={profile.links.medium} className="text-link" target="_blank" rel="noopener noreferrer">
                Read my writing on Medium <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          )}
        </section>

        <div className="about-cta">
          <Link href="/work" className="btn btn-primary">
            See my work
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
