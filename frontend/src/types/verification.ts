export interface VerificationRequest {
  apaar_id?: string;
  reference?: string;
  requester_type?: 'EMPLOYER' | 'INSTITUTION' | 'REGULATOR' | 'PUBLIC';
  purpose?: string;
}

export interface VerificationResult {
  reference: string;
  is_verified: boolean;
  status: 'VERIFIED' | 'MOCK_VERIFIED' | 'NOT_VERIFIED' | 'INVALID_REFERENCE';
  student_name: string;
  institution_name: string;
  programme_name: string;
  admission_year: number | string;
  enrolment_status: string;
  digital_signature_valid: boolean;
  checked_at: string;
  is_mock: boolean;
  disclaimer: string;
  apaar_id?: string;
  qr_code_data?: string;
}
