# Product Requirements Document (PRD)

## 1. Product summary
Create a secure, scalable, interoperable student data management and verification platform for AICTE-approved institutions. Institutions submit student-level records associated with APAAR ID. The platform validates records, monitors enrolment, highlights anomalies, provides dashboards, and supports restricted verification by authorized stakeholders.

## 2. Problem
Institutions may submit student information using different mechanisms and at different levels of detail. This makes it difficult to maintain complete and consistent student-level records, identify duplicate entries, compare enrolment with approved intake, and provide timely academic verification.

## 3. Goals
- Provide a structured institution-to-AICTE student-data submission workflow.
- Identify missing, malformed, duplicate, and inconsistent records.
- Compare reported enrolment with the relevant approved intake and permitted exceptions.
- Flag possible cross-institution enrolment conflicts for review.
- Provide dashboards and reports for permitted users.
- Support privacy-conscious, authorized academic record verification.
- Provide clear audit trails for sensitive operations.

## 4. Non-goals
- Replacing APAAR or DigiLocker.
- Claiming live government verification without an authorized integration.
- Making automatic disciplinary decisions based solely on a validation flag.
- Publicly exposing student records.
- Treating every repeated APAAR ID as evidence of fraud.
- Building a production national identity system as a hackathon prototype.

## 5. Users and permissions
### AICTE administrator
Can view authorized cross-institution summaries, review flagged records, manage institution access, monitor submissions, and generate regulatory reports.

### Institution administrator
Can manage records belonging to their institution, upload data, correct validation issues, view intake monitoring, and generate permitted institution reports. Cannot read or modify another institution's private records.

### Authorized verifier
Can submit a verification request and receive only the fields permitted for that purpose.

### Student
May view their own permitted record and verification status if this feature is enabled. Access must be tied to an appropriate authenticated or verified flow.

## 6. Core features
1. Authentication and role-based access.
2. Institution profile and approved intake records.
3. Student record creation and updates.
4. CSV/Excel bulk upload with preview and row-level error report.
5. APAAR ID presence/format checks and integration adapter for authoritative validation if available.
6. Duplicate detection within and across institutions.
7. Enrolment lifecycle management: active, transferred, withdrawn, completed, pending review.
8. Intake monitoring by institution, campus, programme, academic year, and applicable seat category.
9. AICTE and institution dashboards.
10. Flag review and resolution workflow.
11. Restricted academic verification with a traceable reference.
12. Audit trail and downloadable reports.
13. API integration points for institutional systems.

## 7. Success criteria
- A permitted institution can upload a synthetic dataset and see a row-level validation report.
- Duplicate identifiers are flagged without silently deleting records.
- Enrolment is compared with the correct intake scope and applicable exceptions.
- Cross-institution matches are classified for review instead of automatically labelled fraudulent.
- Institution users cannot access another institution's private records.
- Authorized verifiers receive only permitted fields.
- Mock verification is clearly labelled as mock.
- Key workflows have automated tests and a repeatable demo script.

## 8. Key assumptions and dependencies
- Official API access and specifications may not be available during the hackathon.
- Any official integration must be confirmed with the relevant authority and credentials.
- Intake and seat-category rules must be configurable and reviewed against applicable official guidance.
- The prototype uses synthetic data.
- Product decisions and unresolved questions are tracked in `DECISIONS.md`.

## 9. Main demo story
An institution uploads student records. The platform identifies a duplicate APAAR ID and an enrolment count that needs review. The reviewer opens the cases, sees the reasons and context, and records a resolution. An authorized verifier then checks a synthetic academic record using a verification reference.
