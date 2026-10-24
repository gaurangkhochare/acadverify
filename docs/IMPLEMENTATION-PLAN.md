# Implementation Plan

## Phase 0 — Agree on foundations
**Owners:** All members; Member 2 coordinates technical baseline.

- Confirm framework, database, repository structure, and package manager.
- Read all project documents.
- Confirm roles, enrolment statuses, issue codes, API response format, and shared identifiers.
- Create `.env.example`, formatting/lint rules, and a basic run command.
- Record unresolved decisions.

**Exit criteria:** No unresolved contract decision blocks parallel development.

## Phase 1 — Working skeleton
**Primary owner:** Member 2; Member 1 supports frontend skeleton; Member 3 prepares test fixtures.

- Minimal frontend and API run locally.
- Database connection and migrations work.
- Authentication and role model exist.
- Synthetic seed institutions, programmes, intake records, users, and enrolments exist.
- Health-check endpoint and README setup instructions work.

**Exit criteria:** All members can run the project and access the agreed API.

## Phase 2 — Core student records
**Member 2:** CRUD, uploads, tenant isolation, audit events.
**Member 1:** Login, navigation, institution pages, upload flow.
**Member 3:** Record-level validation and duplicate rules.

**Exit criteria:** An institution can submit synthetic records and receive persisted, row-level results.

## Phase 3 — Intake and cross-institution review
**Member 3:** Intake calculations, duplicate classification, anomaly explanations.
**Member 2:** Issue persistence and review endpoints.
**Member 1:** Validation issue table, filters, detail and resolution UI.

**Exit criteria:** Duplicate and intake scenarios appear consistently in UI and API.

## Phase 4 — Dashboards and verification
**Member 1:** AICTE/institution dashboards and verifier UI.
**Member 2:** Dashboard/report endpoints, verification authorization, audit.
**Member 3:** Verification rules, reference integrity, domain tests.

**Exit criteria:** Dashboard metrics derive from stored synthetic data; verification returns only permitted fields.

## Phase 5 — Hardening and demo
- Run unit, integration, authorization, and end-to-end tests.
- Test institution-level isolation.
- Test upload edge cases and conflicting enrolments.
- Confirm mock integrations are labelled.
- Review error messages, accessibility, responsiveness, and empty states.
- Prepare a repeatable demo dataset and demo script.
- Update README, deployment notes, and progress log.

**Exit criteria:** The demo flow works from upload to review to verification, and known limitations are documented.

## Work management
Track each task with: ID, owner, dependencies, status, acceptance criteria, test evidence, and blockers. Avoid marking work complete based on code generation alone.
