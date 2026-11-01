# APAAR Student Data Management and Verification Platform

**AICTE SIH Problem Statement 26263 — Regulation Bureau — Smart Automation**

A centralized platform concept for AICTE-approved institutions to submit student-level records linked to APAAR ID, validate submissions, monitor enrolment against approved intake, flag potential duplicate/conflicting enrolments, and support authorized academic verification.

## Project principles
- APAAR ID is an academic identifier, not by itself proof of admission or graduation.
- Repeated identifiers trigger contextual checks, not automatic fraud conclusions.
- Official government integrations must not be simulated as if they were live.
- Use synthetic student records during development and demos.
- Protect student information with least-privilege access, auditability, and data minimization.

## Team
See `docs/TEAM-OWNERSHIP.md` and the individual briefs in `docs/members/`.

## Documentation order
1. `AGENTS.md`
2. `docs/PRD.md`
3. `docs/ARCHITECTURE.md`
4. `docs/API-CONTRACTS.md`
5. `docs/DATA-MODEL.md`
6. `docs/VALIDATION-RULES.md`
7. `docs/SECURITY.md`
8. `docs/TEAM-OWNERSHIP.md`
9. `docs/IMPLEMENTATION-PLAN.md`
10. `docs/TEST-PLAN.md`
11. `docs/UI-DESIGN-AND-WORKFLOWS.md` (Master UI Design System, All 12 Pages & 6 Workflows)
12. `docs/SIH-DEMO-AND-PITCH-GUIDE.md` (Live Demo Script & Jury Defense Cheat Sheet)

## Proposed stack
The team may use React for the frontend, FastAPI for the backend, and MySQL or PostgreSQL for persistence. Confirm the stack in `docs/DECISIONS.md` before implementation. Do not introduce additional infrastructure without a reason.

## Local setup
Setup instructions will be completed after the stack and repository structure are confirmed. Keep `.env.example` updated and never commit a real `.env` file.

## Status
Documentation baseline prepared. Implementation status is tracked in `docs/PROGRESS.md`.
