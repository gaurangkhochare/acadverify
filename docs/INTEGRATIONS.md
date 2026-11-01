# External Integrations & Adapter Specifications

This document outlines the architectural specifications, request/response schemas, and mock adapter interfaces for integrating external national systems (APAAR / ABC / DigiLocker / AICTE Central Repository).

---

## 1. Core Integration Guardrails
1. **Never Spoof Live Access**: All development and SIH demonstrations must explicitly run through the Mock Adapter layer. The UI and API responses will always label synthetic verification as `is_mock: true` and status `MOCK_VERIFIED`.
2. **Adapter Pattern Isolation**: The backend core domain logic must call abstract service interfaces (`IApaarService`, `IAictePortalSyncService`). Swapping from the mock adapter to the official NIC / DigiLocker / AICTE API requires only changing an environment variable (`APAAR_ADAPTER_MODE=live`), with zero changes to business logic.
3. **Data Minimization (DPDP Act 2023)**: Third-party verification queries (such as employer verifications) return only verified status, student name, institution, programme, and admission year. Aadhaar numbers, parents' names, and sensitive personal details are never exposed.

---

## 2. APAAR / Academic Bank of Credits (ABC) Adapter

### Interface Definition
```python
class IApaarValidator(ABC):
    @abstractmethod
    def validate_apaar_id(self, apaar_id: str, student_name: str, dob: str) -> ApaarValidationResult:
        """Validates student identity against APAAR registry."""
        pass
```

### Mock Adapter Implementation Rules
The Mock APAAR service uses deterministic synthetic rules so that developers, judges, and automated tests can reliably verify edge cases:

| APAAR ID Pattern | Simulated Outcome | Description |
|---|---|---|
| `1234 5678 9012` | `MOCK_VALID` | Normal valid student record (Asha Krishnan). |
| `9876 5432 1098` | `MOCK_VALID` (Cross-college) | Registered at multiple institutions (triggers dual-enrolment warning). |
| `1111 2222 3333` | `MOCK_INVALID_CHECKSUM` | Fails Verhoeff checksum algorithm test. |
| `0000 0000 0000` | `MOCK_NOT_FOUND` | Identifier does not exist in national registry. |
| Any 12-digit number ending in `999` | `MOCK_NAME_MISMATCH` | APAAR exists, but student name does not match ABC registry. |
| Other 12-digit numbers | `MOCK_VALID` | Treated as valid synthetic student. |

### Mock Request & Response Schema
- **Simulated Endpoint:** `POST /api/v1/mock/apaar/verify`
- **Request Payload:**
```json
{
  "apaar_id": "123456789012",
  "student_name": "Asha Krishnan",
  "dob": "2005-04-12"
}
```
- **Response `200 OK` (Valid):**
```json
{
  "is_valid": true,
  "apaar_id": "123456789012",
  "status": "MOCK_VALID",
  "registered_name": "Asha Krishnan",
  "abc_account_id": "ABC-2026-9921",
  "is_mock": true,
  "checked_at": "2026-10-30T14:00:00Z"
}
```

---

## 3. QR Code & Digital Verification Service

### Purpose
To support Requirement 10 of the SIH Problem Statement (displaying APAAR ID along with Student ID on certificates, and enabling instant tamper-evident verification by employers and regulatory bodies).

### QR Code Content & Format
The QR code printed on transcripts or displayed in the student verification modal embeds an authenticated, tamper-evident URL:
```text
https://aicte-apaar.gov.in/verify?ref=VRF-2026-A9B7C3&sig=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

### Digital Signature Scheme
1. **Payload Generation:**
```json
{
  "ref": "VRF-2026-A9B7C3",
  "apaar_id_hash": "sha256(123456789012)",
  "institution_code": "1-3324521401",
  "academic_year": "2026-27",
  "status": "ACTIVE",
  "issued_at": 1793361600
}
```
2. **Signature:** Calculated using HMAC-SHA256 with the server's private institutional signing key.
3. **Verification Process:**
   - Scanning the QR code calls `GET /api/v1/verification/{reference}`.
   - The backend validates the HMAC signature against the stored database record.
   - The response includes `digital_signature_valid: true` and the verified enrolment status.

---

## 4. AICTE Central Repository & Institution Sync

### Sync Mechanism
1. **Periodic Batch Push**: Institution Admins commit approved and validated batches via the 3-step bulk upload flow.
2. **Regulatory Bureau Sync**: Once an intake cycle closes (or on demand by AICTE Officers), validated enrolment records are synchronized into the central AICTE registry.
3. **Audit Snapshot**: Each sync snapshot is signed and tagged with the submitting official's user ID, timestamp, and AICTE approval letter reference.

---

## 5. DigiLocker Credential Issuance Interface (Future Roadmap)

When official DigiLocker NAD (National Academic Depository) credentials are provided:
- The system will call the DigiLocker Push API to issue signed digital admission certificates directly into the student's DigiLocker wallet anchored to their APAAR ID.
- Fallback in current prototype: Downloadable digitally signed PDF Certificate with embedded verification QR code.
