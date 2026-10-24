export interface Institution {
  id: string;
  name: string;
  aicte_reference: string;
  campus: string;
  state: string;
  status: 'active' | 'review_required' | 'suspended';
  created_at: string;
}

export interface Programme {
  id: string;
  institution_id: string;
  name: string;
  programme_code: string;
  campus: string;
  status: 'active' | 'inactive';
}

export interface ApprovedIntake {
  id: string;
  institution_id: string;
  programme_id: string;
  programme_name: string;
  academic_year: string;
  approved_seats: number;
  authorized_supernumerary_seats: number;
  total_approved: number;
  effective_from: string;
  effective_to?: string;
  source_reference?: string;
}

export interface DashboardSummary {
  institution_id?: string;
  institution_name?: string;
  academic_year: string;
  approved_intake: number;
  students_enrolled: number;
  records_verified: number;
  need_attention_count: number;
  seats_remaining: number;
  intake_fill_percentage: number;
  // For AICTE Admin national aggregates
  total_institutions?: number;
  total_records?: number;
  total_issues_open?: number;
  compliance_rate?: number;
}

