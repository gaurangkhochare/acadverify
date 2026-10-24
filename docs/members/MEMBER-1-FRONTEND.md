# Member 1 Brief — Frontend and UX

## Mission
Build the responsive frontend for the APAAR platform using the shared PRD, UX flows, and API contracts.

## Owned scope
- Login and role-aware navigation.
- AICTE administrator dashboard.
- Institution administrator dashboard.
- Student record table and details.
- Bulk upload wizard, preview, row errors, and results.
- Validation issues and review screens.
- Authorized verification interface.
- Shared design system and reusable UI components.
- Frontend tests and integration with backend APIs.

## Dependencies
- Use `docs/API-CONTRACTS.md` as the API source of truth.
- Use `docs/VALIDATION-RULES.md` for issue codes and explanations.
- Use `docs/UX-FLOWS.md` and `docs/ACCEPTANCE-CRITERIA.md`.
- Coordinate contract changes with Members 2 and 3.

## Rules
- Never rely on frontend-only authorization.
- Do not hardcode fabricated production metrics.
- Temporary mocks must be labelled and replaceable.
- Include loading, empty, failure, and permission-denied states.
- Do not expose full APAAR IDs unnecessarily.
- Keep API calls in a shared client/service layer rather than scattering fetch logic through components.

## Deliverables
- Runnable frontend.
- Responsive pages for the agreed MVP flows.
- API integration.
- Frontend tests for important interactions.
- Updated UX documentation when flows change.

## Completion checklist
- [x] Login and role-aware navigation work.
- [x] Dashboards consume real backend responses.
- [x] Upload flow shows row-level validation results.
- [x] Issues can be filtered and opened.
- [x] Verification screen shows permitted fields only.
- [x] Error/loading/empty states exist.
- [x] No critical UI action is decorative or inert.
- [x] Tests and run instructions are documented.
