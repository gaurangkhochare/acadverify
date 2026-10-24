export type IssueType = 
  | 'MISSING_APAAR_ID'
  | 'IDENTIFIER_FORMAT_INVALID'
  | 'IDENTIFIER_NOT_VERIFIED'
  | 'DUPLICATE_WITHIN_UPLOAD'
  | 'DUPLICATE_WITHIN_INSTITUTION'
  | 'CROSS_INSTITUTION_MATCH'
  | 'POTENTIAL_ACTIVE_ENROLMENT_CONFLICT'
  | 'INTAKE_DATA_MISSING'
  | 'POTENTIAL_INTAKE_EXCESS'
  | 'INCONSISTENT_DATES'
  | 'INCOMPLETE_RECORD'
  | 'ANOMALOUS_ENROLMENT_CHANGE';

export type IssueSeverity = 'warning' | 'review' | 'critical';

export type IssueStatus = 'open' | 'resolved';

export interface ValidationIssue {
  issue_id: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  record_id?: string;
  student_name?: string;
  institution_id?: string;
  institution_name?: string;
  message: string;
  explanation: string;
  created_at: string;
  resolved_at?: string;
  resolution?: string;
  resolved_by?: string;
}

export interface IssueResolutionPayload {
  resolution_type: 'CONFIRMED_VALID' | 'TRANSFER_RECORDED' | 'DATA_CORRECTED' | 'REJECTED';
  notes: string;
}

