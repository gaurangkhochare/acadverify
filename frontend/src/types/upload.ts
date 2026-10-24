export type UploadStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'completed_with_issues' 
  | 'failed';

export interface UploadSummary {
  rows_received: number;
  accepted: number;
  flagged: number;
  rejected: number;
}

export interface UploadRowFixItem {
  row_number: number;
  student_name: string;
  problem: string;
  what_to_do: string;
  field_in_error?: string;
  current_value?: string;
  suggested_action?: string;
}

export interface UploadJob {
  upload_id: string;
  filename: string;
  status: UploadStatus;
  summary: UploadSummary;
  results_url: string;
  rows_to_fix: UploadRowFixItem[];
  created_at: string;
}

