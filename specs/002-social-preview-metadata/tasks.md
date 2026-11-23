# Tasks: Social preview metadata (Nov 2026)

## Phase 1: Setup
- [x] T001 Audit the live head of /, /about and /work/careergenai against the fixing-metadata checklist

## Phase 2: User Story 1 - Previews on every page (P1) 🎯
- [x] T002 [US1] Add `shareImage`, `openGraphBase`, `twitterBase`, `siteTitle`, `siteDescription` to lib/seo.ts and reuse them in `pageMeta()`
- [x] T003 [US1] Use the shared fields in app/layout.tsx root metadata
- [x] T004 [P] [US1] Add tests/seo.test.ts (share image, site name, locale, canonical = og:url)
**Checkpoint**: `npm test` passes

## Phase 3: User Story 2 - Home canonical (P2)
- [x] T005 [US2] Add page-level metadata to app/page.tsx with canonical `/` and og:url `/`

## Phase 4: Polish
- [x] T006 Run tests (17/17)
- [ ] T007 Static preview build (Vercel preview on the PR)
- [ ] T008 Check the deployed head of /, /about, /work/careergenai and the LinkedIn Post Inspector
- [ ] T009 Merge to main and verify production

## Dependencies
T001 → T002 → T003/T004/T005; T006–T009 last.
