import { request } from './api';
import { ValidationIssue, IssueResolutionPayload } from '../types/validation';
import { MOCK_ISSUES } from './mockData';

let localIssues = [...MOCK_ISSUES];

export const issueService = {
  async getIssues(institutionId?: string): Promise<ValidationIssue[]> {
    try {
      const query = institutionId ? `?institution_id=${institutionId}` : '';
      return await request<ValidationIssue[]>(`/issues${query}`);
    } catch {
      if (institutionId) {
        return localIssues.filter((i) => i.institution_id === institutionId);
      }
      return localIssues;
    }
  },

  async getIssue(issueId: string): Promise<ValidationIssue> {
    try {
      return await request<ValidationIssue>(`/issues/${issueId}`);
    } catch {
      const issue = localIssues.find((i) => i.issue_id === issueId);
      if (!issue) throw new Error('Issue not found');
      return issue;
    }
  },

  async resolveIssue(issueId: string, payload: IssueResolutionPayload): Promise<ValidationIssue> {
    try {
      return await request<ValidationIssue>(`/issues/${issueId}/resolve`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const idx = localIssues.findIndex((i) => i.issue_id === issueId);
      if (idx === -1) throw new Error('Issue not found');

      const updated: ValidationIssue = {
        ...localIssues[idx],
        status: 'resolved',
        resolved_at: new Date().toISOString(),
        resolution: `${payload.resolution_type}: ${payload.notes}`,
        resolved_by: 'Reviewer',
      };
      localIssues[idx] = updated;
      return updated;
    }
  },
};

