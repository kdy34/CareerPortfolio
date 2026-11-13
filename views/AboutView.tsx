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
            I am {profile.name}, a graduate student in Artificial Intelligence Engineering at Bay Atlantic University in Washington, DC. I hold a B.Sc. in Software Engineering from Bahçeşehir University in Istanbul. An exchange year at Bay Atlantic University first brought me to Washington, and I returned for my master’s degree after graduating.
          </p>
          <p>
            My experience spans AI, data science, and cloud computing. As a Business Analyst Intern at Panasonic, I automated ERP data validation with SQL and Python, which saved more than ten hours of manual work each week and improved reporting precision by 30 percent. As a Cloud Engineer Intern at Huawei, I worked with Huawei Cloud services such as ECS, EVS, VPC, and IAM, and built Python log-analysis tools that reduced operational overhead by 15 percent for a high-traffic application.
          </p>
          <p>
            My projects span machine learning, LLM-powered applications, and scalable system design. CareerGENAI is an LLM-powered career mentor that analyzes résumés, identifies skill gaps, and generates learning roadmaps, built on a microservice-based architecture with FastAPI and containerized services. In my undergraduate capstone, BECAYIS, I worked on nature-inspired optimization for matching civil servants who want to relocate. In my graduate research, I am studying how layered safeguards can protect cloud-deployed LLM applications from prompt injection.
          </p>
          <p>
            Beyond technical work, I have developed leadership and communication skills through student government and public-facing volunteering in Washington, DC. As Vice President of the Student Government Association, I represent students in campus governance and help turn their feedback into action. I also volunteer in guest experience at the International Spy Museum. Earlier, as Vice President of the IEEE student branch at Bahçeşehir University, I helped organize workshops, hackathons, and summits.
          </p>
          <p>
            I am focused on building practical AI-driven solutions with measurable impact and real business value. I care about what a model can do, and just as much about the software, data, and cloud infrastructure that make its output useful.
          </p>
          <p className="muted">I work in English and Turkish, and I am learning Spanish.</p>
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
