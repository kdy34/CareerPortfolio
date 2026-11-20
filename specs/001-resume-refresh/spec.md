# Feature Specification: Résumé refresh (Nov 2026)

**Feature Branch**: `001-resume-refresh`
**Created**: 2026-11-20
**Status**: Implemented
**Input**: "This is my current resume. Update the website with it" (KutayDenizYazicioglu_Resume_2.pdf)

> Compact spec: small content change on an existing project.

## User Scenarios & Testing

### User Story 1 - Recruiter reads the current résumé (Priority: P1)
A recruiter opens /resume or downloads the PDF and sees exactly the November 2026 résumé.
**Independent Test**: Compare /resume text and the downloaded PDF against the source PDF.
**Acceptance**: Given the new PDF, When a visitor opens /resume, Then every section (Summary, Experience, Education, Projects, Research, Technical Skills, Certifications, Leadership & Community Involvement, Languages) matches the PDF word for word, without the phone number.

### User Story 2 - Other pages agree with the résumé (Priority: P2)
A visitor reading About, Work or Research never sees facts that contradict the résumé.
**Acceptance**: Spy Museum dates (Feb 2026 – Sep 2026), DC Startup & Tech Week (2025, 2026), BECAYIS role (led the AI work, ~480 records, PSO/ACO via REST), internship bullets, research scope and skill groups match the PDF.

### Edge Cases
- PDF lists some certificates without issuers; the résumé page follows the PDF, the About page keeps the confirmed issuers.

## Requirements
- **FR-001**: `/resume` MUST mirror the new PDF word for word, minus the phone number.
- **FR-002**: The downloadable PDF MUST be replaced with the new file.
- **FR-003**: Facts repeated on Home/About/Work/Research MUST match the new PDF.
- **FR-004**: No page MUST show the phone number.

## Success Criteria
- **SC-001**: 0 differences between /resume text and the PDF (excluding phone).
- **SC-002**: 0 contradictions between the PDF and other pages for the facts listed in Story 2.

## Assumptions
- "Washington, DC area" stays as the site-wide location (Alexandria, VA is in the area); /resume shows "Alexandria, VA" as in the PDF.
- Site-only content not on the PDF (DevFest DC, Lions Club, Career Discovery Week, extra skills) stays.
