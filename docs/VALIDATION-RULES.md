# Validation and Business Rules

## Principles
- Every rule must have a stable rule code, a clear explanation, a severity, and a test.
- Validation flags prompt correction or review; they do not automatically establish fraud.
- Distinguish structural validation from authoritative identity verification.
- Use synthetic identifiers in development.

## Rule categories
### Record structure
- Required fields must be present.
- Academic year, dates, programme, and seat category must use accepted values.
- Dates must be logically consistent.
- Unknown categories should be rejected or held for correction rather than silently converted.

### APAAR identifier
- Flag missing identifiers.
- Check format only against a documented format specification; do not invent a format.
- If no official validation integration exists, status should be `NOT_VERIFIED` or `MOCK_VALIDATION`, not `VERIFIED`.
- Do not expose identifiers in error messages unnecessarily.

### Duplicate within upload/institution
- Detect repeated identifier/enrolment combinations.
- Preserve source rows and report all affected row numbers.
- Avoid silently deleting or merging records.

### Cross-institution matches
- Create a potential-match issue when an identifier is associated with more than one institution.
- Compare admission dates, academic years, programme, and enrolment statuses where available.
- Classify likely cases such as transfer, historical record, potentially conflicting active enrolments, or insufficient evidence.
- Keep the result as `REVIEW_REQUIRED` unless authorized rules and evidence support a stronger conclusion.
- Do not reveal one institution's private record to another institution user.

### Intake monitoring
- Compare enrolment with approved intake for the matching institution, campus, programme, academic year, and seat category.
- Apply authorized additional-seat rules only when the applicable approval data is recorded.
- Report the calculation and rule used.
- If intake data is missing or stale, return `INTAKE_DATA_MISSING` rather than claiming excess enrolment.
- Separate counts of records from counts of distinct students where needed.

### Anomaly detection
- Flag unusual changes or inconsistent patterns with an explanation.
- Anomaly score is advisory only.
- Do not auto-reject admissions based solely on anomaly detection.

## Suggested issue types
- `MISSING_APAAR_ID`
- `IDENTIFIER_FORMAT_INVALID`
- `IDENTIFIER_NOT_VERIFIED`
- `DUPLICATE_WITHIN_UPLOAD`
- `DUPLICATE_WITHIN_INSTITUTION`
- `CROSS_INSTITUTION_MATCH`
- `POTENTIAL_ACTIVE_ENROLMENT_CONFLICT`
- `INTAKE_DATA_MISSING`
- `POTENTIAL_INTAKE_EXCESS`
- `INCONSISTENT_DATES`
- `INCOMPLETE_RECORD`
- `ANOMALOUS_ENROLMENT_CHANGE`

## Required tests
- Duplicate identifier within one file.
- Same identifier across two institutions.
- Legitimate transfer with previous enrolment marked transferred.
- Withdrawn historical enrolment.
- Two active enrolments requiring review.
- Missing approved intake.
- Intake reached exactly.
- Intake exceeded with no applicable exception.
- Additional authorized seats accounted for.
- Mock validation never returns official verified status.
