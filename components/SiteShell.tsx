import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/content";
import { Header } from "./Header";
import { SocialLinks } from "./SocialLinks";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-name">{profile.name}</p>
            <p className="muted">{profile.location}</p>
          </div>
          <SocialLinks />
          <Link href="/contact" className="btn btn-ghost">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="container footer-meta">
          <p className="mono">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </>
  );
}
