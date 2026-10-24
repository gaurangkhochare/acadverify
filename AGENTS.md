# AI Agent Instructions — APAAR Student Platform

## Mission
Build the APAAR ID-Based Student Data Management and Verification Platform for AICTE SIH Problem Statement 26263.

## Read before coding
Read these files before implementation:
1. `README.md`
2. `docs/PRD.md`
3. `docs/ARCHITECTURE.md`
4. `docs/API-CONTRACTS.md`
5. `docs/DATA-MODEL.md`
6. `docs/VALIDATION-RULES.md`
7. `docs/SECURITY.md`
8. `docs/TEAM-OWNERSHIP.md`
9. The relevant member brief under `docs/members/`
10. `docs/IMPLEMENTATION-PLAN.md`

## Working rules
- Treat the documents as the agreed source of truth. If they conflict, record the conflict in `docs/DECISIONS.md` and resolve it before implementing dependent functionality.
- Do not invent official APAAR, DigiLocker, AICTE, or other government API access. Use a clearly labelled mock adapter unless official documentation and credentials are supplied.
- Never claim a mock response is official verification.
- Do not store real student personal data in development fixtures. Use synthetic data only.
- Enforce authorization and institution-level data isolation on the backend; hiding a frontend button is not security.
- Do not treat every repeated APAAR ID as fraud. Detect and classify possible conflicts for review.
- Do not automatically reject a student or institution solely because an anomaly rule fires.
- Keep secrets out of source control. Use environment variables and maintain `.env.example` without real secrets.
- Make UI controls functional. Do not present static buttons or fabricated metrics as implemented functionality.
- Write tests for business rules, authorization, validation, and cross-module integration.
- Keep API contracts stable. If a contract must change, update `docs/API-CONTRACTS.md`, inform affected owners, and add/update tests.
- Avoid overwriting another member's owned files without coordination.
- Run relevant tests and report actual results. Do not claim tests passed unless they were run.
- Update `docs/PROGRESS.md` and relevant documentation when work is completed or decisions change.

## Development workflow
1. Inspect the repository and current status.
2. Identify blockers and missing decisions.
3. Implement in small, runnable increments.
4. Test each increment.
5. Integrate modules through agreed contracts.
6. Verify acceptance criteria before marking work complete.

## Definition of done
A feature is done only when its behavior is implemented, authorization is enforced where applicable, validation/error states exist, relevant tests pass, documentation is updated, and the feature works with the integrated application.
