import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { institutionService } from '../services/institutionService';
import { issueService } from '../services/issueService';
import { DashboardSummary, Institution } from '../types/institution';
import { ValidationIssue } from '../types/validation';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Building2, AlertTriangle, ShieldCheck, Download, Search } from 'lucide-react';

export const AicteDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [search, setSearch] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('ALL');

  useEffect(() => {
    async function loadData() {
      const [dash, insts, issuesData] = await Promise.all([
        reportService.getDashboardSummary('AICTE_ADMIN'),
        institutionService.getInstitutions(),
        issueService.getIssues(),
      ]);
      setSummary(dash);
      setInstitutions(insts);
      setIssues(issuesData);
    }
    loadData();
  }, []);

  const filteredInstitutions = institutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.aicte_reference.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter === 'ALL' || inst.state === stateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              AICTE Regulatory Bureau Overview
            </h1>
            <span className="bg-[#0B3C88] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              National View
            </span>
          </div>
          <p className="text-slate-600 mt-1 text-base">
            Cross-institution student intake monitoring, duplicate conflict detection, and compliance auditing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate('/issues')}
            variant="primary"
            className="bg-[#0B3C88] font-bold"
          >
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-300" />
            Review Flagged Cases ({issues.length})
          </Button>
        </div>
      </div>

      {/* National Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Monitored Institutions"
          value={summary?.total_institutions ?? 48}
        />
        <MetricCard
          label="Total Approved Intake"
          value={summary?.approved_intake?.toLocaleString() ?? '14,850'}
        />
        <MetricCard
          label="Total Enrolled Students"
          value={summary?.students_enrolled?.toLocaleString() ?? '13,920'}
        />
        <MetricCard
          label="Open Validation Flags"
          value={summary?.total_issues_open ?? 342}
          variant="warning"
          onClick={() => navigate('/issues')}
        />
      </div>

      {/* Cross-Institution Review Alert Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-950 text-base sm:text-lg">
              Potential Cross-Institution Enrolment Conflicts Detected
            </h3>
            <p className="text-sm text-amber-900 mt-0.5">
              2 students currently possess concurrent active enrolments in multiple state institutions. Regulatory inquiry or transfer reconciliation required.
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/issues')}
          variant="primary"
          className="bg-amber-600 hover:bg-amber-700 border-amber-600 text-white font-bold flex-shrink-0"
        >
          Inspect Conflicts
        </Button>
      </div>

      {/* Institutions Directory */}
      <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900">
            Approved Institutions & Intake Status
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search institution..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0B3C88] focus:outline-none"
              />
            </div>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-white text-slate-700 focus:ring-2 focus:ring-[#0B3C88]"
            >
              <option value="ALL">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-[#071830] text-white text-sm font-bold">
              <tr>
                <th className="py-3.5 px-6">Institution</th>
                <th className="py-3.5 px-6">AICTE Reference</th>
                <th className="py-3.5 px-6">State / Campus</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-900 font-medium">
              {filteredInstitutions.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{inst.name}</td>
                  <td className="py-4 px-6 font-mono text-slate-600">{inst.aicte_reference}</td>
                  <td className="py-4 px-6 text-slate-700">{inst.campus}, {inst.state}</td>
                  <td className="py-4 px-6">
                    <Badge variant={inst.status === 'active' ? 'success' : 'warning'}>
                      {inst.status === 'active' ? 'Compliant' : 'Review Required'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/students')}
                      className="border-[#0B3C88] text-[#0B3C88] font-bold"
                    >
                      View Records
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

