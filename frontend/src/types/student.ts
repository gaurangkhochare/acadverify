export type SeatCategory = 
  | 'REGULAR' 
  | 'SUPERNUMERARY' 
  | 'NRI' 
  | 'OCI' 
  | 'FOREIGN_NATIONAL' 
  | 'OTHER';

export type EnrolmentStatus = 
  | 'SUBMITTED' 
  | 'ACTIVE' 
  | 'TRANSFERRED' 
  | 'WITHDRAWN' 
  | 'COMPLETED' 
  | 'PENDING_REVIEW';

export type RecordValidationStatus = 
  | 'VALID' 
  | 'FLAGGED' 
  | 'REJECTED' 
  | 'MOCK_VERIFIED';

export interface StudentRecord {
  id: string;
  student_id: string;
  apaar_id: string; // 12-digit APAAR ID
  apaar_id_masked: string; // e.g. "•••• •••• 5678"
  name: string;
  institution_id: string;
  institution_name: string;
  programme_id: string;
  programme_name: string;
  academic_year: string;
  institution_student_id: string;
  admission_date: string;
  seat_category: SeatCategory;
  status: EnrolmentStatus;
  status_effective_date: string;
  validation_status: RecordValidationStatus;
  issues_count?: number;
  created_at: string;
  updated_at: string;
}

export interface StudentFilters {
  search?: string;
  programme_id?: string;
  academic_year?: string;
  seat_category?: string;
  status?: string;
  validation_status?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

