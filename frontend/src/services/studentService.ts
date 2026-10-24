import { request } from './api';
import { StudentRecord, StudentFilters, PaginatedResult } from '../types/student';
import { MOCK_STUDENTS } from './mockData';

let localStudents = [...MOCK_STUDENTS];

export const studentService = {
  async getStudents(filters: StudentFilters = {}): Promise<PaginatedResult<StudentRecord>> {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.seat_category) params.append('seat_category', filters.seat_category);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const query = params.toString() ? `?${params.toString()}` : '';
      return await request<PaginatedResult<StudentRecord>>(`/students${query}`);
    } catch {
      // Local fallback with filtering
      let filtered = [...localStudents];

      if (filters.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(
          (stu) =>
            stu.name.toLowerCase().includes(s) ||
            stu.institution_student_id.toLowerCase().includes(s) ||
            stu.apaar_id.includes(s)
        );
      }

      if (filters.status) {
        filtered = filtered.filter((stu) => stu.status === filters.status);
      }

      if (filters.seat_category) {
        filtered = filtered.filter((stu) => stu.seat_category === filters.seat_category);
      }

      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const total = filtered.length;
      const total_pages = Math.ceil(total / limit);
      const items = filtered.slice((page - 1) * limit, page * limit);

      return {
        items,
        total,
        page,
        limit,
        total_pages,
      };
    }
  },

  async getStudent(recordId: string): Promise<StudentRecord> {
    try {
      return await request<StudentRecord>(`/students/${recordId}`);
    } catch {
      const found = localStudents.find((s) => s.id === recordId || s.student_id === recordId);
      if (!found) throw new Error('Student record not found');
      return found;
    }
  },

  async createStudent(record: Partial<StudentRecord>): Promise<StudentRecord> {
    try {
      return await request<StudentRecord>('/students', {
        method: 'POST',
        body: JSON.stringify(record),
      });
    } catch {
      const newRec: StudentRecord = {
        id: `rec_${Date.now()}`,
        student_id: `stu_${Date.now()}`,
        apaar_id: record.apaar_id || '',
        apaar_id_masked: record.apaar_id ? `•••• •••• ${record.apaar_id.slice(-4)}` : 'Missing ID',
        name: record.name || 'Unknown',
        institution_id: record.institution_id || 'inst_01',
        institution_name: 'Delhi Institute of Advanced Engineering & Technology',
        programme_id: record.programme_id || 'prog_btech_it',
        programme_name: record.programme_name || 'B.Tech, Information Technology',
        academic_year: record.academic_year || '2024-2025',
        institution_student_id: record.institution_student_id || `DIAET-2024-${Math.floor(Math.random() * 900 + 100)}`,
        admission_date: record.admission_date || new Date().toISOString().slice(0, 10),
        seat_category: record.seat_category || 'REGULAR',
        status: record.status || 'ACTIVE',
        status_effective_date: new Date().toISOString().slice(0, 10),
        validation_status: record.apaar_id?.length === 12 ? 'VALID' : 'FLAGGED',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localStudents.unshift(newRec);
      return newRec;
    }
  },

  async updateStudent(recordId: string, updates: Partial<StudentRecord>): Promise<StudentRecord> {
    try {
      return await request<StudentRecord>(`/students/${recordId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    } catch {
      const idx = localStudents.findIndex((s) => s.id === recordId);
      if (idx === -1) throw new Error('Student record not found');
      
      const updated = {
        ...localStudents[idx],
        ...updates,
        apaar_id_masked: updates.apaar_id
          ? `•••• •••• ${updates.apaar_id.slice(-4)}`
          : localStudents[idx].apaar_id_masked,
        updated_at: new Date().toISOString(),
      };
      localStudents[idx] = updated;
      return updated;
    }
  },
};

