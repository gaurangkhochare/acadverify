import React, { useEffect, useState } from 'react';
import { reportService } from '../services/reportService';
import { Button } from '../components/common/Button';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const ReportsPage: React.FC = () => {
  const { notify } = useNotification();
  const [report, setReport] = useState<any>(null);
  const [academicYear, setAcademicYear] = useState<string>('2024-2025');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadReport() {
      try {
        setIsLoading(true);
        const data = await reportService.getEnrolmentReport(academicYear);
        setReport(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadReport();
  }, [academicYear]);

  const handleExportCSV = () => {
    if (!report?.programmes) return;
    const header = 'Programme,Approved_Intake,Enrolled,Regular_Quota,Supernumerary,Seats_Remaining,Utilization\n';
    const rows = report.programmes
      .map(
        (p: any) =>
          `"${p.programme}",${p.approved_intake},${p.enrolled},${p.regular},${p.supernumerary},${p.seats_left},"${p.utilization}"`
      )
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aicte_intake_report_${academicYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('success', 'Report Exported', 'Intake report downloaded successfully.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Approved Intake & Enrolment Report
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Official intake compliance overview across sanctioned academic programmes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:ring-2 focus:ring-[#0B3C88]"
          >
            <option value="2024-2025">Academic Year 2024-2025</option>
            <option value="2023-2024">Academic Year 2023-2024</option>
          </select>

          <Button onClick={handleExportCSV} variant="primary" className="bg-[#0B3C88] font-bold">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Programme-wise Intake Utilization</h2>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-[#071830] text-white text-sm font-bold">
              <tr>
                <th className="py-3.5 px-6">Programme</th>
                <th className="py-3.5 px-6">Sanctioned Intake</th>
                <th className="py-3.5 px-6">Total Enrolled</th>
                <th className="py-3.5 px-6">Regular Quota</th>
                <th className="py-3.5 px-6">Supernumerary (EWS/TFW)</th>
                <th className="py-3.5 px-6">Seats Left</th>
                <th className="py-3.5 px-6">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm font-medium text-slate-900">
              {report?.programmes?.map((prog: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold">{prog.programme}</td>
                  <td className="py-4 px-6 font-black">{prog.approved_intake}</td>
                  <td className="py-4 px-6 font-bold text-[#0B3C88]">{prog.enrolled}</td>
                  <td className="py-4 px-6 text-slate-700">{prog.regular}</td>
                  <td className="py-4 px-6 text-slate-700">+{prog.supernumerary}</td>
                  <td className="py-4 px-6 font-bold text-emerald-700">{prog.seats_left}</td>
                  <td className="py-4 px-6 font-bold">{prog.utilization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-800">Regulatory Intake Rules Applied:</p>
          <p>• AICTE Approval Process Handbook (APH) supernumerary seat exemptions applied for registered Economically Weaker Section (EWS) and Tuition Fee Waiver (TFW) allocations.</p>
          <p>• Enrolment counts reflect validated student records submitted through the APAAR portal.</p>
        </div>
      </div>
    </div>
  );
};

