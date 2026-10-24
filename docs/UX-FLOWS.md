# UX Flows and Page Inventory

## Global UX requirements
- Responsive and accessible interface.
- Consistent navigation and status language.
- Clear loading, success, empty, and error states.
- Confirm destructive or sensitive actions.
- Tables support search, filters, pagination, and useful empty states.
- Never display sensitive student identifiers unnecessarily.

## Institution admin flow
1. Sign in.
2. View institution dashboard.
3. Open student records or bulk upload.
4. Select CSV/XLSX and preview column mapping.
5. View row-level errors and warnings.
6. Submit valid records.
7. Open flagged issues and inspect explanations.
8. Correct data or record a review outcome.
9. Export an institution-scoped report.

## AICTE admin flow
1. Sign in.
2. View national/institution overview.
3. Filter by state, institution, programme, academic year, and issue type.
4. Open an institution or flagged case.
5. Review evidence and history permitted for the role.
6. Record a review decision with rationale.
7. Generate a report.

## Verifier flow
1. Open verification page.
2. Enter an authorized reference or identifier.
3. Complete any required authorization/purpose step.
4. View a minimal verification result.
5. See timestamp and reference validity.
6. Do not expose full records by default.

## Optional student flow
1. Authenticate through an approved method.
2. View own permitted academic information.
3. Request correction or access a verification reference if supported.

## Important states
- No records yet.
- Upload processing.
- Upload completed with warnings.
- Upload rejected due to structural errors.
- Record pending review.
- Identifier not verified by an authoritative source.
- External verification service unavailable.
- Permission denied.
- Verification reference expired or invalid.
