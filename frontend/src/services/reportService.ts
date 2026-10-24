import { request } from './api';
import { DashboardSummary } from '../types/institution';
import { MOCK_INSTITUTION_DASHBOARD, MOCK_AICTE_DASHBOARD } from './mockData';

export const reportService = {
  async getDashboardSummary(role: string = 'INSTITUTION_ADMIN'): Promise<DashboardSummary> {
    try {
      return await request<DashboardSummary>('/dashboard/summary');
    } catch {
      if (role === 'AICTE_ADMIN') {
        return MOCK_AICTE_DASHBOARD;
      }
      return MOCK_INSTITUTION_DASHBOARD;
    }
  },

  async getEnrolmentReport(academicYear: string = '2024-2025'): Promise<any> {
    try {
      return await request(`/reports/enrolment?academic_year=${academicYear}`);
    } catch {
      return {
        academic_year: academicYear,
        summary: MOCK_INSTITUTION_DASHBOARD,
        programmes: [
          {
            programme: 'B.Tech Information Technology',
            approved_intake: 120,
            enrolled: 118,
            regular: 112,
            supernumerary: 6,
            seats_left: 2,
            utilization: '98.3%',
          },
          {
            programme: 'B.Tech Computer Science & Engineering',
            approved_intake: 180,
            enrolled: 175,
            regular: 168,
            supernumerary: 7,
            seats_left: 5,
            utilization: '97.2%',
          },
        ],
      };
    }
  },
};

