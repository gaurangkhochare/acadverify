# Team Ownership and Collaboration

## Team model
Three members own separate workstreams but integrate into one application. Ownership means primary responsibility, not permission to break shared contracts.

## Member 1 — Frontend and UX
### Owns
- Frontend pages, routing, layout, design system, forms, tables, charts.
- Role-specific dashboards.
- Upload interface and validation report presentation.
- Verification interface.
- Frontend API client and UI loading/error/empty states.
- Frontend component tests.

### Primary files/folders
- `frontend/**`
- `docs/UX-FLOWS.md`
- `docs/members/MEMBER-1-FRONTEND.md`

### Depends on
- API contracts from Member 2.
- Validation issue codes and result shapes from Member 3.
- Agreed roles and acceptance criteria.

### Must not
- Implement security only by hiding frontend elements.
- Invent API response shapes independently.
- fabricate production data or official verification outcomes.

## Member 2 — Backend, Database and Authentication
### Owns
- Backend API server, authentication, authorization, data persistence.
- Database schema and migrations.
- Institution and student CRUD.
- Upload orchestration and API contracts.
- Audit logging, pagination, filtering, and institution-level isolation.
- Backend integration tests and local run instructions.

### Primary files/folders
- `backend/**`
- `docs/API-CONTRACTS.md`
- `docs/DATA-MODEL.md`
- `docs/SECURITY.md`
- `docs/members/MEMBER-2-BACKEND.md`

### Must coordinate
Publish stable request/response contracts and database models before other members depend on them. Provide a local API and synthetic seed data early.

## Member 3 — Validation, Intelligence and Verification
### Owns
- Testable domain validation rules.
- Duplicate detection and cross-institution match classification.
- Intake monitoring and seat-category logic.
- Anomaly detection explanations.
- Verification-reference generation and verification business logic.
- Domain unit tests and synthetic test datasets.

### Primary files/folders
- `backend/app/validation/**` or agreed validation module
- `backend/app/verification/**` or agreed verification module
- `tests/domain/**`
- `docs/VALIDATION-RULES.md`
- `docs/members/MEMBER-3-VALIDATION.md`

### Must coordinate
Do not create a separate incompatible database or API. Implement domain logic behind interfaces agreed with Member 2 and provide issue/result schemas to Member 1.

## Shared files
Only one designated editor should lead changes to:
- `AGENTS.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/IMPLEMENTATION-PLAN.md`
- `docs/DECISIONS.md`
- `docs/PROGRESS.md`

All members may propose changes, but shared contract changes must be communicated before implementation.

## Integration protocol
1. Agree on stack, folder structure, identifiers, enums, API contracts, and error format.
2. Member 2 creates a minimal working API, schema, authentication, and synthetic seed data.
3. Member 3 implements validation logic and tests against the agreed models.
4. Member 1 integrates frontend pages against the agreed API contract; mock API responses may be used temporarily but must be replaced for the final demo.
5. Integrate continuously rather than waiting until the end.
6. Run the end-to-end test plan and demo script.
7. Record blockers and decisions in shared documentation.

## Definition of ready
A task is ready when its purpose, owner, dependencies, inputs/outputs, acceptance criteria, and test approach are clear.

## Definition of done
A task is done when implemented, tested, documented, and integrated with the agreed interfaces.
