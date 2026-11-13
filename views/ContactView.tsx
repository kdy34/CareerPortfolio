import { profile } from "@/content";
import { ContactForm, type ContactMode } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

export function ContactView({ mode }: { mode: ContactMode }) {
  const hasLinks = Boolean(profile.links.linkedin || profile.links.github || profile.links.email);
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow mono">Contact</p>
          <h1 className="display">Get in touch</h1>
          <p className="lede">
            I am open to opportunities in AI engineering, data science, and cloud computing, and to research collaboration. Send me a message and I will get back to you.
          </p>
        </div>
      </header>

      <div className="container contact-grid">
        <section aria-labelledby="form-title" className="contact-card">
          <h2 id="form-title" className="h3">Send a message</h2>
          <ContactForm mode={mode} />
          <p className="privacy muted">
            <strong>Privacy:</strong> this form collects your name, email, and message and forwards them to me by email through an email provider (Resend) so I can reply. The site does not keep a copy of your message or use it for marketing. A hashed form of your IP address is kept for about ten minutes only to limit repeated submissions.
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
        </aside>
      </div>
    </>
  );
}
