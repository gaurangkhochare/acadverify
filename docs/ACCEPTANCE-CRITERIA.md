# Acceptance Criteria

## Authentication and permissions
- Users can authenticate through the selected mechanism.
- Each role sees only its permitted routes and actions.
- API authorization is tested independently of the frontend.
- Institution users cannot access another institution's private data.

## Bulk upload
- Supported file types and size limits are enforced.
- Missing or unexpected columns are explained.
- The user can preview the upload.
- Each row receives a clear result.
- Failed rows are not silently discarded.
- Upload summary counts reconcile with row results.

## Validation
- Missing identifiers are flagged.
- Duplicate records are identified with an explanation.
- Cross-institution matches are flagged for review.
- Transfers and historical records are considered before classifying conflicts.
- Mock validation is never presented as official verification.

## Intake monitoring
- Intake is matched to the correct institution, programme, campus, and academic year.
- Approved exceptions are applied only when recorded and configured.
- Missing intake data results in an explicit unknown state.
- The dashboard explains why an excess-enrolment issue was raised.

## Verification
- Verification requires an authorized request.
- The response includes only permitted fields.
- References cannot be altered to retrieve another record.
- The result is traceable and time-stamped.
- Unavailable official integration is disclosed clearly.

## Dashboard and reporting
- Metrics derive from stored data or clearly labelled synthetic data.
- Filters work and do not bypass authorization.
- Exported data respects role permissions.
- Empty and error states are handled.

## Delivery
- Setup instructions work on a clean environment.
- Database migrations and synthetic seed data are reproducible.
- Required tests are run and results documented.
- Known limitations and mock integrations are disclosed.
