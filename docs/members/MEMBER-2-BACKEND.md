# Member 2 Brief — Backend, Database and Authentication

## Mission
Build the shared backend foundation and stable contracts used by the frontend and validation modules.

## Owned scope
- API application and configuration.
- Authentication and role-based authorization.
- Database schema, migrations, indexes, and seed data.
- Institution, programme, approved intake, student, and enrolment records.
- Bulk-upload endpoint and upload job/result persistence.
- Issue persistence and review endpoints in coordination with Member 3.
- Dashboard/report endpoints.
- Audit events.
- Institution-level data isolation.
- API and integration tests.

## Dependencies
- `docs/API-CONTRACTS.md`
- `docs/DATA-MODEL.md`
- `docs/SECURITY.md`
- `docs/VALIDATION-RULES.md`

## Rules
- Publish schemas and sample responses early.
- Never trust client-supplied institution scope without authorization checks.
- Keep migrations reproducible.
- Use transactions for related record changes.
- Do not store plaintext passwords or secrets.
- Use synthetic seed data.
- Do not hardcode a global unique constraint on APAAR ID for all enrolments without accounting for lifecycle and permitted programme scenarios.

## Deliverables
- Runnable API and database setup.
- Migrations and synthetic seed data.
- API schemas and consistent errors.
- Authentication and authorization.
- Upload and record persistence.
- Audit trail.
- Backend tests and setup instructions.

## Completion checklist
- [ ] A clean setup can run migrations and seed data.
- [ ] Authentication and roles work.
- [ ] Institution isolation is enforced in the backend.
- [ ] Student records can be created and updated.
- [ ] Upload results persist with row-level outcomes.
- [ ] Validation issue endpoints support Member 3's output.
- [ ] Dashboard/report endpoints return role-scoped data.
- [ ] Tests cover critical permissions and persistence.
