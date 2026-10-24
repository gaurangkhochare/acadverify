# Data Model

This is a logical baseline. The backend owner should convert it into database migrations and confirm exact field types before implementation.

## Entities
### User
- `id`
- `name`
- `email` or approved login identifier
- `password_hash` or external identity reference
- `role` (`AICTE_ADMIN`, `INSTITUTION_ADMIN`, `VERIFIER`, optional `STUDENT`)
- `institution_id` nullable for platform-level users
- `status`
- `created_at`, `updated_at`

### Institution
- `id`
- `name`
- `aicte_reference` where available
- `campus`
- `state`
- `status`
- `created_at`, `updated_at`

### Programme
- `id`
- `institution_id`
- `name`
- `programme_code`
- `campus`
- `status`

### ApprovedIntake
- `id`
- `institution_id`
- `programme_id`
- `academic_year`
- `approved_seats`
- `authorized_supernumerary_seats` or a linked seat-category table
- `source_reference`
- `effective_from`, `effective_to`

### Student
- `id` internal primary key
- `apaar_id` protected and access-controlled; consider tokenization or encryption based on design
- `name` and minimum necessary demographic fields
- timestamps

### Enrolment
- `id`
- `student_id`
- `institution_id`
- `programme_id`
- `academic_year`
- `institution_student_id`
- `admission_date`
- `seat_category` (`REGULAR`, `SUPERNUMERARY`, `NRI`, `OCI`, `FOREIGN_NATIONAL`, `OTHER`)
- `status` (`SUBMITTED`, `ACTIVE`, `TRANSFERRED`, `WITHDRAWN`, `COMPLETED`, `PENDING_REVIEW`)
- `status_effective_date`
- `created_at`, `updated_at`

### UploadJob and UploadRowResult
Track file metadata, submitting user, institution, status, row counts, validation results, and errors. Do not retain uploaded files indefinitely without a defined need and retention policy.

### ValidationIssue
- `id`
- `issue_type`
- `severity`
- `status`
- `related_enrolment_id`
- `related_student_id` when permitted
- `explanation`
- `rule_code`
- `created_at`, `resolved_at`
- `resolution`, `resolved_by`

### VerificationRequest
- `id`
- `reference`
- `requester_type`
- `purpose`
- `status`
- `permitted_result_fields`
- `created_at`, `expires_at`

### AuditEvent
- `id`
- `actor_user_id`
- `action`
- `resource_type`
- `resource_id`
- `timestamp`
- `outcome`
- minimal metadata; avoid logging secrets or full identifiers unnecessarily

## Relationships
- Institution has many users, programmes, intake records, and enrolments.
- Student can have multiple enrolment records over time.
- Enrolment belongs to one student, institution, and programme.
- Enrolment may have multiple validation issues.
- Upload job belongs to the submitting user and institution.
- Verification request references a permitted record or a limited result.
- Audit events reference the actor and affected resource where appropriate.

## Data integrity requirements
- Use internal immutable primary keys.
- APAAR ID is not the database primary key.
- Do not impose a simplistic global uniqueness constraint on enrolment rows by APAAR ID, because transfers and permitted multiple-programme scenarios need contextual handling.
- Add indexes for institution, programme, academic year, status, and appropriately protected identifier matching.
- Enforce referential integrity and validate state transitions.
- Define retention, correction, and deletion handling before production use.
