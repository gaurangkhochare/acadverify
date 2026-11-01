import React, { useEffect, useState } from 'react';
import { issueService } from '../services/issueService';
import { ValidationIssue, IssueSeverity, IssueStatus } from '../types/validation';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { AlertTriangle, CheckCircle, Filter, ArrowRight, ShieldAlert } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const IssueListPage: React.FC = () => {
  const { notify } = useNotification();
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Resolution modal state
  const [selectedIssue, setSelectedIssue] = useState<ValidationIssue | null>(null);
  const [resolutionType, setResolutionType] = useState<'CONFIRMED_VALID' | 'TRANSFER_RECORDED' | 'DATA_CORRECTED' | 'REJECTED'>('CONFIRMED_VALID');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadIssues = async () => {
    try {
      setIsLoading(true);
      const data = await issueService.getIssues();
      setIssues(data);
    } catch {
      notify('error', 'Failed to load validation issues');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    try {
      setIsSubmitting(true);
      await issueService.resolveIssue(selectedIssue.issue_id, {
        resolution_type: resolutionType,
        notes: notes || 'Reviewed by registrar.',
      });
      notify('success', 'Issue marked resolved', selectedIssue.message);
      setSelectedIssue(null);
      setNotes('');
      loadIssues();
    } catch {
      notify('error', 'Failed to submit resolution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSeverity = severityFilter === 'ALL' || issue.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (sev: IssueSeverity) => {
    switch (sev) {
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      case 'review':
        return <Badge variant="amber">Review Required</Badge>;
      case 'warning':
        return <Badge variant="warning">Warning</Badge>;
      default:
        return <Badge>{sev}</Badge>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 min-w-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Validation Issues & Compliance Flags
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Review potential duplicate enrolments, missing APAAR identifiers, cross-institution conflicts, and intake warnings.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="severity-select" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Severity:
          </label>
          <select
            id="severity-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-[#0B3C88]"
          >
            <option value="ALL">All Severities</option>
            <option value="critical">Critical</option>
            <option value="review">Review Required</option>
            <option value="warning">Warning</option>
          </select>

          <label htmlFor="status-select" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-2">
            Status:
          </label>
          <select
            id="status-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-[#0B3C88]"
          >
            <option value="ALL">All Statuses</option>
            <option value="open">Open Flags</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing {filteredIssues.length} issues
        </div>
      </div>

      {/* Issues List Cards */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.issue_id}
            className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                {getSeverityBadge(issue.severity)}
                <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {issue.type}
                </span>
                {issue.status === 'resolved' && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Resolved
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {issue.message}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {issue.explanation}
              </p>

              {issue.student_name && (
                <div className="text-xs font-semibold text-slate-500">
                  Student Record: <span className="text-slate-800 font-bold">{issue.student_name}</span>
                </div>
              )}

              {issue.resolution && (
                <div className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 font-medium">
                  <strong>Resolution note:</strong> {issue.resolution}
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              {issue.status === 'open' ? (
                <Button
                  onClick={() => setSelectedIssue(issue)}
                  variant="primary"
                  className="bg-[#0B3C88] hover:bg-[#072E68] text-sm font-bold px-6 py-2.5"
                >
                  Resolve Case
                </Button>
              ) : (
                <span className="text-sm font-bold text-emerald-700">Audit logged</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resolution Dialog */}
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={`Resolve Issue: ${selectedIssue.message}`}
          maxWidth="lg"
        >
          <form onSubmit={handleResolve} className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-slate-900">
              <p className="font-bold text-amber-900">Issue Details:</p>
              <p className="mt-1">{selectedIssue.explanation}</p>
            </div>

            <div>
              <label htmlFor="resolution-type-select" className="block text-sm font-bold text-slate-800 mb-1">
                Resolution Outcome *
              </label>
              <select
                id="resolution-type-select"
                value={resolutionType}
                onChange={(e) => setResolutionType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-[#0B3C88]"
              >
                <option value="CONFIRMED_VALID">Confirm Legitimate Enrolment (Exemption / Prior Approval)</option>
                <option value="TRANSFER_RECORDED">Transfer Confirmed (Previous institution status updated)</option>
                <option value="DATA_CORRECTED">Data Corrected (Correct APAAR ID or seat category recorded)</option>
                <option value="REJECTED">Reject Enrolment (Duplicate or invalid admission cancelled)</option>
              </select>
            </div>

            <div>
              <label htmlFor="resolution-notes-textarea" className="block text-sm font-bold text-slate-800 mb-1">
                Audit Notes & Rationale *
              </label>
              <textarea
                id="resolution-notes-textarea"
                rows={3}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="State the regulatory document reference, transfer certificate number, or registrar verification..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setSelectedIssue(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting} className="bg-[#0B3C88]">
                Submit Resolution
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

