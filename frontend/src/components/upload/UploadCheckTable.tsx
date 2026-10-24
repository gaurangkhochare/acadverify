import React from 'react';
import { UploadRowFixItem } from '../../types/upload';
import { Button } from '../common/Button';

export interface UploadCheckTableProps {
  filename: string;
  totalRows: number;
  readyRows: number;
  rowsToFix: UploadRowFixItem[];
  needsFixCount?: number;
  hasConsent: boolean;
  onConsentChange: (val: boolean) => void;
  onSubmitReady: () => void;
  onDownloadFixList: () => void;
  isSubmitting?: boolean;
}

export const UploadCheckTable: React.FC<UploadCheckTableProps> = ({
  filename,
  totalRows,
  readyRows,
  rowsToFix,
  needsFixCount,
  hasConsent,
  onConsentChange,
  onSubmitReady,
  onDownloadFixList,
  isSubmitting = false,
}) => {
  const fixCount = needsFixCount ?? (totalRows - readyRows > 0 ? totalRows - readyRows : rowsToFix.length);


  return (
    <div className="space-y-8">
      {/* File Checked Banner */}
      <div className="text-base sm:text-lg text-slate-800">
        File checked: <strong className="font-bold text-slate-900">{filename}</strong>, {totalRows} rows
      </div>

      {/* Two Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ready to Submit Card */}
        <div className="rounded-2xl border-2 border-slate-900 bg-[#EBF2FE] p-6">
          <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
            {readyRows}
          </div>
          <div className="mt-2 text-base sm:text-lg font-bold text-slate-900">
            rows are ready to submit
          </div>
        </div>

        {/* Needs Fixing Card */}
        <div className="rounded-2xl border-2 border-slate-900 bg-[#FDE68A] p-6">
          <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
            {fixCount}
          </div>
          <div className="mt-2 text-base sm:text-lg font-bold text-slate-900">
            rows need fixing first
          </div>
        </div>
      </div>

      {/* Rows to fix table */}
      {fixCount > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Rows to fix
          </h2>

          <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="min-w-full divide-y-2 divide-slate-900 text-left">
              <thead className="bg-[#071830] text-white">
                <tr>
                  <th scope="col" className="py-3.5 px-6 font-bold text-sm sm:text-base w-24">
                    Row
                  </th>
                  <th scope="col" className="py-3.5 px-6 font-bold text-sm sm:text-base w-48">
                    Student
                  </th>
                  <th scope="col" className="py-3.5 px-6 font-bold text-sm sm:text-base">
                    Problem
                  </th>
                  <th scope="col" className="py-3.5 px-6 font-bold text-sm sm:text-base">
                    What to do
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm sm:text-base text-slate-900">
                {rowsToFix.slice(0, 4).map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-4 px-6 font-bold">{item.row_number}</td>
                    <td className="py-4 px-6 font-medium text-slate-800">{item.student_name}</td>
                    <td className="py-4 px-6 text-slate-700">{item.problem}</td>
                    <td className="py-4 px-6 text-slate-700">{item.what_to_do}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-sm text-slate-600">
            Showing {Math.min(4, fixCount)} of {fixCount}. Download the full list to fix them all at once.
          </div>
        </div>
      )}

      {/* Student Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-center space-x-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hasConsent}
            onChange={(e) => onConsentChange(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-slate-900 text-[#0B3C88] focus:ring-[#0B3C88]"
          />
          <span className="text-sm sm:text-base font-semibold text-slate-900">
            Students have consented to sharing this data with AICTE.
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <Button
          onClick={onSubmitReady}
          disabled={!hasConsent || readyRows === 0}
          isLoading={isSubmitting}
          variant="primary"
          className="text-base sm:text-lg font-bold py-3.5 px-8 bg-[#0B3C88] hover:bg-[#072E68]"
        >
          Submit {readyRows} ready records
        </Button>

        {fixCount > 0 && (
          <Button
            onClick={onDownloadFixList}
            variant="outline"
            className="text-base sm:text-lg font-bold py-3.5 px-6 border-2 border-[#0B3C88] text-[#0B3C88]"
          >
            Download list of {fixCount} rows to fix
          </Button>
        )}
      </div>
    </div>
  );
};
