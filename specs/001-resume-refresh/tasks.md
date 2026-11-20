# Tasks: Résumé refresh (Nov 2026)

## Phase 1: Setup
- [x] T001 Extract text from the new PDF and diff it against content/en/resumeDocument.ts

## Phase 2: User Story 1 - Current résumé (P1) 🎯
- [x] T002 [US1] Rewrite content/en/resumeDocument.ts word for word from the PDF (no phone)
- [x] T003 [US1] Update views/ResumeView.tsx for project subtitles/tech, Research, grouped skills, Leadership & Community
- [x] T004 [P] [US1] Add résumé v2 styles in app/globals.css
- [x] T005 [P] [US1] Replace public/kutay-deniz-yazicioglu-resume.pdf with the new PDF
**Checkpoint**: /resume rendered and compared to the PDF

## Phase 3: User Story 2 - Consistent pages (P2)
- [x] T006 [P] [US2] Update internship bullets, Spy Museum and DC Startup & Tech Week dates, skill groups in content/en/resume.ts
- [x] T007 [P] [US2] Update BECAYIS role, card and contributions in content/en/projects.ts
- [x] T008 [P] [US2] Add paper scope in content/en/research.ts and views/ResearchView.tsx
- [x] T009 [P] [US2] Update volunteering sentence in views/AboutView.tsx

## Phase 4: Polish
- [x] T010 Run tests (14/14) and static preview build
- [x] T011 Visual check of /resume
- [x] T012 Push to main and verify production

## Dependencies
T001 → T002 → T003; T004–T009 parallel after T001; T010–T012 last.
