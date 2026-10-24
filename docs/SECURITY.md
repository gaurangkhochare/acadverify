# Security and Privacy Requirements

## Core principles
- Least privilege.
- Backend-enforced authorization.
- Institution-level tenant isolation.
- Data minimization.
- Auditability.
- Secure defaults.
- Transparent distinction between mock and official verification.

## Authentication
- Use a well-maintained authentication approach.
- Hash passwords with a modern password-hashing algorithm if local passwords are used.
- Rate-limit login and sensitive endpoints.
- Secure sessions/tokens and implement logout/expiry behavior.
- Never store plaintext passwords or secrets in source code.

## Authorization
- AICTE roles can access only the cross-institution information needed for their duties.
- Institution users can only access records within their authorized institution scope.
- Verifiers can access only approved fields for a legitimate purpose.
- Students, if supported, can access only their own records through an appropriate identity flow.
- Check authorization for every read, update, export, and verification operation.

## Privacy
- Use synthetic data in development and demo environments.
- Avoid unnecessary sensitive fields.
- Mask identifiers in routine UI displays and logs.
- Do not put student details into public URLs or QR payloads.
- Provide consent/authorization and purpose information where required by the eventual deployment model.
- Define retention and correction policies before production use.

## Audit
Log sensitive events such as login failures, record creation/update, bulk upload, issue resolution, exports, permission changes, and verification requests. Do not log passwords, tokens, or unnecessary full identifiers.

## Application security
- Validate inputs on the server.
- Use parameterized database access/ORM protections.
- Apply CSRF protections where relevant.
- Configure CORS narrowly.
- Rate-limit bulk and verification endpoints.
- Restrict upload size and accepted file types; parse files defensively.
- Use secure HTTP headers and TLS in deployed environments.
- Store secrets in environment variables or a secret manager.
- Keep dependencies updated.

## Threats to consider
- Institution user accessing another institution's records.
- Forged or replayed verification references.
- Malicious upload files.
- Account takeover.
- Over-broad exports.
- Enumeration of student identifiers.
- Untrusted claims presented as official government verification.

## Prototype limitation
A hackathon prototype is not automatically production-ready for real student data. Do not upload real student records until legal, security, integration, and operational requirements have been reviewed.
