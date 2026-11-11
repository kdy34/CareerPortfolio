"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, profile } from "@/content";

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.classList.add("menu-open");
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${profile.name}, home`}>
          <span className="brand-mark" aria-hidden="true">{profile.shortMark}</span>
          <span className="brand-name">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="nav-desktop">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="btn btn-small btn-primary" aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="menu-icon" data-open={open} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" data-open={open} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
