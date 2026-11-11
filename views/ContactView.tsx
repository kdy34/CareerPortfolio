import { faq, profile } from "@/content";
import { ContactForm, type ContactMode } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

export function ContactView({ mode }: { mode: ContactMode }) {
  const hasLinks = Boolean(profile.links.linkedin || profile.links.github || profile.links.email);
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow mono">Contact</p>
          <h1 className="display">Let’s talk about what you’re building.</h1>
          <p className="lede">
            I’m interested in AI and data engineering roles, applied research, and projects that could benefit from an early prototype. Share what you’re working on and where I might fit.
          </p>
        </div>
      </header>

      <div className="container contact-grid">
        <section aria-labelledby="form-title" className="contact-card">
          <h2 id="form-title" className="h3">Send a message</h2>
          <ContactForm mode={mode} />
          <p className="privacy muted">
            <strong>Privacy:</strong> this form collects your name, email, and message and forwards them to me by email through an email provider (Resend) so I can reply. The site doesn’t keep a copy of your message or use it for marketing. A hashed form of your IP address is kept for about ten minutes only to limit repeated submissions.
          </p>
        </section>

        <aside className="contact-side" aria-labelledby="elsewhere">
          {hasLinks && (
            <div className="side-block">
              <h2 id="elsewhere" className="mono label">Elsewhere</h2>
              <SocialLinks className="social-links stacked" />
            </div>
          )}
          <div className="side-block">
            <h2 className="mono label">Based in</h2>
            <p>{profile.location}</p>
          </div>
          <div className="side-block">
            <h2 className="mono label">Questions people ask</h2>
            <dl className="faq">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd className="muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}
