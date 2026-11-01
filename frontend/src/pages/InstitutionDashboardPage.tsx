import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reportService } from '../services/reportService';
import { issueService } from '../services/issueService';
import { DashboardSummary } from '../types/institution';
import { ValidationIssue } from '../types/validation';
import { MetricCard } from '../components/dashboard/MetricCard';
import { IntakeProgress } from '../components/dashboard/IntakeProgress';
import { IssueActionCard } from '../components/dashboard/IssueActionCard';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useNotification } from '../context/NotificationContext';

export const InstitutionDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedIssue, setSelectedIssue] = useState<ValidationIssue | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState<string>('');
  const [isResolving, setIsResolving] = useState<boolean>(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true);
        const [dashData, issuesData] = await Promise.all([
          reportService.getDashboardSummary('INSTITUTION_ADMIN'),
          issueService.getIssues(user?.institution_id || 'inst_01'),
        ]);
        setSummary(dashData);
        setIssues(issuesData);
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, [user]);

  const handleResolveIssue = async () => {
    if (!selectedIssue) return;
    try {
      setIsResolving(true);
      await issueService.resolveIssue(selectedIssue.issue_id, {
        resolution_type: 'CONFIRMED_VALID',
        notes: resolutionNotes || 'Reviewed and confirmed valid by registrar.',
      });
      notify('success', 'Issue resolved successfully', selectedIssue.message);
      setIssues((prev) => prev.filter((i) => i.issue_id !== selectedIssue.issue_id));
      setSelectedIssue(null);
      setResolutionNotes('');
    } catch {
      notify('error', 'Failed to resolve issue');
    } finally {
      setIsResolving(false);
    }
  };

  const institutionName = user?.institution_name || summary?.institution_name || 'Delhi Institute of Advanced Engineering & Technology';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 min-w-0">
      {/* Top Welcome Header - Refined Typography & Visual Hierarchy */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome, {institutionName}
          </h1>
          <span className="inline-flex items-center bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Sample data
          </span>
        </div>
      </div>

      {/* Quick Action Buttons - Left-aligned with stat cards, subtle secondary hover */}
      <div className="w-full flex flex-wrap items-center gap-3">
        <Button
          onClick={() => navigate('/upload')}
          variant="primary"
          className="text-sm sm:text-base font-bold px-5 py-2.5 bg-[#0B3C88] hover:bg-[#082b60] text-white rounded-xl shadow-xs transition-colors"
        >
          Upload student data
        </Button>
        <Button
          onClick={() => navigate('/verify')}
          variant="outline"
          className="text-sm sm:text-base font-semibold px-5 py-2.5 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl shadow-xs transition-colors"
        >
          Verify a student record
        </Button>
      </div>

      {/* 4 Metric Cards - Fluid CSS Grid, subtle light gray borders, soft shadows, pastel warning */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <MetricCard
          label="Approved intake"
          value={summary?.approved_intake ?? 120}
          onClick={() => navigate('/reports')}
        />
        <MetricCard
          label="Students enrolled"
          value={summary?.students_enrolled ?? 118}
          onClick={() => navigate('/students')}
        />
        <MetricCard
          label="Records verified"
          value={summary?.records_verified ?? 112}
          onClick={() => navigate('/students')}
        />
        <MetricCard
          label="Need your attention"
          value={summary?.need_attention_count ?? 6}
          variant="warning"
          onClick={() => navigate('/issues')}
        />
      </div>

      {/* Intake Progress Section - Fluid percentage width, subtle light gray border */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
        <IntakeProgress
          enrolled={summary?.students_enrolled ?? 118}
          approved={summary?.approved_intake ?? 120}
        />
      </div>

      {/* "What needs fixing" Section - Distinct structured UI rows */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            What needs fixing
          </h2>
          <button
            onClick={() => navigate('/issues')}
            className="text-sm font-semibold text-[#0B3C88] hover:underline"
          >
            View all {issues.length} issues →
          </button>
        </div>

        <div className="w-full space-y-3">
          {/* Card 1: Missing APAAR ID - Urgent alert container */}
          <IssueActionCard
            title="3 records have no APAAR ID"
            subtext="Ask these students for their ID, then add it."
            actionLabel="Fix now"
            variant="urgent"
            onAction={() => {
              const issue = issues.find((i) => i.type === 'MISSING_APAAR_ID') || issues[0];
              setSelectedIssue(issue);
            }}
          />

          {/* Card 2: Cross-institution conflict */}
          <IssueActionCard
            title="2 students may be enrolled at another institution too"
            subtext="Check the details and confirm which enrolment is correct."
            actionLabel="Review"
            variant="review"
            onAction={() => {
              const issue = issues.find((i) => i.type === 'CROSS_INSTITUTION_MATCH') || issues[1];
              setSelectedIssue(issue);
            }}
          />

          {/* Card 3: Missing Seat Category */}
          <IssueActionCard
            title="1 record is missing its seat category"
            subtext="Choose general, supernumerary, NRI, OCI or foreign national."
            actionLabel="Fix now"
            variant="fix"
            onAction={() => {
              const issue = issues.find((i) => i.type === 'INCOMPLETE_RECORD') || issues[2];
              setSelectedIssue(issue);
            }}
          />
        </div>
      </div>

      {/* Issue Action / Resolution Modal */}
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={`Review Case: ${selectedIssue.message}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-gray-900">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Rule Explanation:
              </p>
              <p className="text-sm text-gray-800 mt-1">{selectedIssue.explanation}</p>
            </div>

            {selectedIssue.student_name && (
              <div className="text-sm">
                <span className="font-bold">Affected Student: </span>
                {selectedIssue.student_name}
              </div>
            )}

            <div>
              <label htmlFor="notes-area" className="block text-sm font-bold text-gray-800 mb-1">
                Registrar Review Notes / Resolution Rationale:
              </label>
              <textarea
                id="notes-area"
                rows={3}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Enter verification notes, transfer certificate number, or corrected APAAR details..."
                className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button
                variant="secondary"
                onClick={() => setSelectedIssue(null)}
                disabled={isResolving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleResolveIssue}
                isLoading={isResolving}
                className="bg-[#0B3C88]"
              >
                Confirm Resolution
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
