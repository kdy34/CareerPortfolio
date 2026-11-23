# Feature Specification: Social preview metadata (Nov 2026)

**Feature Branch**: `002-social-preview-metadata`
**Created**: 2026-11-23
**Status**: Implemented
**Input**: Metadata audit of www.kutayyazicioglu.com (fixing-metadata checklist)

> Compact spec: small metadata fix on an existing project. No visible page content changes.

## Problem
- Subpages (/about, /work, /work/[slug], /research, /resume, /contact) ship without `og:image` and `twitter:image`. `pageMeta()` defines its own `openGraph`/`twitter` objects, and in the Next.js App Router a page-level object replaces the root layout's object instead of merging with it. Links to these pages shared on LinkedIn or elsewhere show no preview image, and also lose `og:site_name` and `og:locale`.
- The home page has no canonical link and no `og:url`.
- The home page `og:title` is only the name, while the document title is the full site title.

## User Scenarios & Testing

### User Story 1 - A recruiter sees a proper preview for any shared page (Priority: P1)
Kutay shares /work/careergenai (or any other page) on LinkedIn; the post shows the site's 1200×630 share image, the page title and the description.
**Independent Test**: Inspect the deployed page head, then the LinkedIn Post Inspector.
**Acceptance**: Given any page in the sitemap, When its head is fetched, Then it contains og:image (1200×630, absolute URL), og:site_name, og:locale, twitter:image, and og:url equal to its canonical URL.

### User Story 2 - The home page has a canonical URL (Priority: P2)
**Acceptance**: Given the home page, When its head is fetched, Then it has `<link rel="canonical" href="https://www.kutayyazicioglu.com">`, og:url to the same URL, and og:title equal to the document title.

### Edge Cases
- /not-found keeps no canonical (it must not inherit the home page's canonical); the canonical stays page-level, not in the root layout.
- Indexing still follows `NEXT_PUBLIC_SITE_INDEXABLE`; robots behavior is unchanged.

## Requirements
- **FR-001**: Shared Open Graph and Twitter fields (type, site name, locale, share image) MUST live in one place (`lib/seo.ts`) and be reused by the root layout, the home page and `pageMeta()`.
- **FR-002**: Every page in the sitemap MUST emit og:image and twitter:image pointing to the generated share image.
- **FR-003**: The home page MUST emit a canonical link and og:url for `/`.
- **FR-004**: No change to page copy, layout, robots rules or sitemap entries.

## Success Criteria
- **SC-001**: 0 sitemap pages without og:image after deploy.
- **SC-002**: canonical and og:url agree on every page that has a canonical.

## Assumptions
- One site-wide share image is enough for now; per-project images can come later.
