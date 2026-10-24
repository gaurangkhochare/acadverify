# Decision Log

Record important decisions using the template below.

## Status key
- `PROPOSED`
- `ACCEPTED`
- `REJECTED`
- `SUPERSEDED`

## Decision template
### DEC-001 — Frontend Framework, Tooling, and Package Manager
- **Status:** ACCEPTED
- **Date:** 2026-10-24
- **Owner:** Member 1 (Frontend & UX)
- **Context:** Select the frontend framework, build tool, UI styling, and package manager for the APAAR platform web application.
- **Options:** 
  1. React 18 + Vite + TypeScript + Tailwind CSS with npm (Chosen)
  2. Next.js with SSR
  3. Vanilla JS or Vue.js
- **Decision:** React 18 with Vite, TypeScript, and Tailwind CSS using standard npm.
- **Consequences:** Provides fast client-side navigation, static SPA build compatibility, responsive design matching mockups, clean typed contracts matching `docs/API-CONTRACTS.md`, and Vitest component testing.
- **Follow-up:** Set up `frontend/` directory with Vite, Tailwind CSS, TypeScript, and standard scripts (`dev`, `build`, `test`).


## Initial decisions to confirm
1. Frontend framework and package manager.
2. Backend framework and Python/runtime version.
3. MySQL versus PostgreSQL.
4. Authentication/session strategy.
5. Monorepo folder layout.
6. CSV/XLSX parsing library and upload limits.
7. Whether a student-facing portal is in MVP scope.
8. Exact intake and seat-category rules for the prototype.
9. Mock APAAR validation behavior and UI wording.
10. QR/reference format and expiry policy.
11. Test framework and CI commands.

Do not silently convert a proposed decision into an accepted one.
