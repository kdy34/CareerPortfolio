# CareerPortfolio Constitution

## Core Principles

### I. Honest, Verifiable Content
Every claim on the site (roles, dates, metrics, GPAs, credentials) MUST come from a source Kutay has provided or confirmed (résumé PDF, transcript, his own words). No invented testimonials, numbers, or affiliations. Testimonials appear only with the author's written approval.

### II. Résumé PDF Is the Source of Truth
The `/resume` page mirrors `public/kutay-deniz-yazicioglu-resume.pdf` word for word, except the phone number. When the PDF changes, the résumé page and every page that repeats the same facts (Home, About, Work, Research) MUST be updated in the same change.

### III. Privacy by Default
Site pages MUST NOT show the phone number, street address, date of birth, student ID, or visa details. The PDF may contain the phone number (approved). Secrets live only in Vercel environment variables, never in the repo.

### IV. Content as Typed Data
Content lives in typed modules under `content/` (Turkish-ready via `getContent`). Views render data; they do not hard-code facts.

### V. Accessible, Light, Professional
Light, professional palette; semantic HTML; WCAG-minded contrast and keyboard access. Copy uses no contractions ("I am", not "I'm").

## Constraints
Next.js App Router, React, TypeScript, plain CSS tokens. Hosted on Vercel (Hobby) at www.kutayyazicioglu.com. Contact form via Resend, rate limiting via Upstash.

## Development Workflow
Spec-Driven Development (GitHub Spec Kit): `specs/###-name/` holds spec.md and tasks.md for each change. Quality gates before push: `npm test`, static preview build, visual check of changed pages. Every push to `main` deploys to production.

## Governance
This constitution supersedes ad-hoc practice. Amendments bump the version and are confirmed by Kutay.

**Version**: 1.0.0 | **Ratified**: 2026-11-20 | **Last Amended**: 2026-11-20
