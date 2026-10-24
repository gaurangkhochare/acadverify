# Member 3 Brief — Validation, Intelligence and Verification

## Mission
Implement testable domain logic that makes the platform more than a data-entry portal.

## Owned scope
- Required-field and structural validation.
- APAAR identifier status handling.
- Duplicate detection within a file and institution.
- Cross-institution potential-match classification.
- Enrolment lifecycle conflict checks.
- Intake monitoring calculations.
- Explainable anomaly flags.
- Verification-reference business logic and permitted-result rules.
- Domain test fixtures and unit tests.

## Dependencies
- `docs/DATA-MODEL.md`
- `docs/VALIDATION-RULES.md`
- `docs/API-CONTRACTS.md`
- `docs/SECURITY.md`

## Rules
- Keep domain logic testable and separate from UI code.
- Coordinate data access and service interfaces with Member 2.
- Supply stable issue codes, severities, and explanations to Member 1.
- Never classify every repeated identifier as fraud.
- Never automatically reject an admission solely because an anomaly rule fired.
- Do not claim authoritative APAAR validation unless an authorized integration is connected.
- Intake calculations must explain the matched intake record and applicable exceptions.

## Deliverables
- Validation module/service.
- Duplicate and conflict classification.
- Intake monitoring logic.
- Verification-reference logic coordinated with backend.
- Synthetic test fixtures.
- Unit tests and examples of expected outcomes.

## Completion checklist
- [ ] Missing/invalid-format identifiers are handled safely.
- [ ] Within-file duplicates are detected.
- [ ] Cross-institution matches create review cases.
- [ ] Transfers and withdrawn historical records are treated contextually.
- [ ] Potential active conflicts are flagged for review.
- [ ] Intake calculations handle missing intake and approved exceptions.
- [ ] Anomaly flags include explanations.
- [ ] Mock validation cannot claim official verification.
- [ ] Domain tests cover normal and edge cases.
