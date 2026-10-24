# Test Plan

## Test levels
- Unit tests for validation and calculations.
- API tests for schemas, permissions, and error handling.
- Database/integration tests for persistence and transactions.
- End-to-end tests for the main user journey.
- Security tests for tenant isolation and restricted verification.
- Manual UI checks for responsiveness and accessibility.

## Must-pass scenarios
1. Institution admin can sign in and see only their institution's records.
2. Institution admin cannot retrieve another institution's student record by guessing an ID.
3. Valid synthetic upload produces a summary and row-level results.
4. Missing APAAR ID is flagged.
5. Duplicate identifier in one upload is flagged and source rows are identifiable.
6. Same identifier in two institutions is flagged for contextual review.
7. A transferred previous enrolment is not automatically classified as fraud.
8. Two potentially conflicting active enrolments require review.
9. Missing intake configuration does not produce a false excess-enrolment conclusion.
10. Intake at the permitted limit is not flagged as excess.
11. Excess enrolment is calculated using the applicable configured rules and exceptions.
12. Mock identifier validation is not labelled official verification.
13. Verifier receives only allowed fields.
14. Verification reference cannot be tampered with to access another record.
15. Sensitive actions create appropriate audit events.
16. Malformed, oversized, or unsupported upload files fail safely.
17. Empty datasets and API failures produce useful UI states.

## Acceptance evidence
For each scenario, record test name, expected result, actual result, and status. Do not claim a test passed unless it was executed.
