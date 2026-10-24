import { request } from './api';
import { Institution, ApprovedIntake } from '../types/institution';
import { MOCK_INSTITUTIONS, MOCK_INTAKE } from './mockData';

export const institutionService = {
  async getMyInstitution(): Promise<Institution> {
    try {
      return await request<Institution>('/institutions/me');
    } catch {
      return MOCK_INSTITUTIONS[0];
    }
  },

  async getInstitutions(): Promise<Institution[]> {
    try {
      return await request<Institution[]>('/institutions');
    } catch {
      return MOCK_INSTITUTIONS;
    }
  },

  async getIntake(institutionId: string): Promise<ApprovedIntake[]> {
    try {
      return await request<ApprovedIntake[]>(`/institutions/${institutionId}/intake`);
    } catch {
      return MOCK_INTAKE.filter((i) => i.institution_id === institutionId || institutionId === 'inst_01');
    }
  },
};

