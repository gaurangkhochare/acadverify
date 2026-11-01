import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '../components/upload/Stepper';
import { UploadCheckTable } from '../components/upload/UploadCheckTable';
import { uploadService } from '../services/uploadService';
import { UploadJob } from '../types/upload';
import { Button } from '../components/common/Button';
import { UploadCloud, FileSpreadsheet, CheckCircle, ArrowRight, Download } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const BulkUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [currentStep, setCurrentStep] = useState<number>(2); // Default to Step 2 to immediately match Mockup 2!
  const [job, setJob] = useState<UploadJob>({
    upload_id: 'upl_demo_2026_01',
    filename: 'students_2026.csv',
    status: 'completed_with_issues',
    summary: {
      rows_received: 250,
      accepted: 242,
      flagged: 6,
      rejected: 2,
    },
    results_url: '/api/v1/uploads/upl_demo_2026_01',
    rows_to_fix: [
      {
        row_number: 14,
        student_name: 'Asha K.',
        problem: 'APAAR ID has 11 digits',
        what_to_do: 'Enter all 12 digits',
      },
      {
        row_number: 39,
        student_name: 'Ravi M.',
        problem: 'Same ID appears twice',
        what_to_do: 'Delete the extra row',
      },
      {
        row_number: 87,
        student_name: 'Neha S.',
        problem: 'Seat category is empty',
        what_to_do: 'Choose a category',
      },
      {
        row_number: 152,
        student_name: 'Imran A.',
        problem: 'Admission would exceed intake',
        what_to_do: 'Check the batch and seat count',
      },
      {
        row_number: 178,
        student_name: 'Suresh P.',
        problem: 'Inconsistent admission date',
        what_to_do: 'Correct admission date',
      },
      {
        row_number: 195,
        student_name: 'Meera D.',
        problem: 'Missing APAAR ID',
        what_to_do: 'Enter the 12-digit APAAR ID',
      },
      {
        row_number: 212,
        student_name: 'Karan J.',
        problem: 'Duplicate APAAR ID within batch',
        what_to_do: 'Verify identity and remove duplicate',
      },
      {
        row_number: 234,
        student_name: 'Ananya R.',
        problem: 'Seat category unverified',
        what_to_do: 'Assign valid seat quota',
      },
    ],
    created_at: new Date().toISOString(),
  });

  const [hasConsent, setHasConsent] = useState<boolean>(true); // checked by default in mockup
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const parsedJob = await uploadService.uploadFile(file);
      setJob(parsedJob);
      setCurrentStep(2);
      notify('success', `File "${file.name}" checked`, `${parsedJob.summary.accepted} rows ready to submit.`);
    } catch {
      notify('error', 'Failed to parse file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitReady = async () => {
    if (!hasConsent) {
      notify('warning', 'Consent required', 'Please confirm that students have consented to sharing data.');
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 600)); // smooth user feedback
      setCurrentStep(3);
      notify('success', 'Records submitted successfully', `${job.summary.accepted} student enrolment records have been persisted.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadFixList = () => {
    const csvContent =
      'Row,Student,Problem,What_to_do\n' +
      job.rows_to_fix
        .map((r) => `"${r.row_number}","${r.student_name}","${r.problem}","${r.what_to_do}"`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fix_rows_${job.filename}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('info', 'Download started', 'Rows needing attention exported to CSV.');
  };

  const handleDownloadTemplate = () => {
    const sample = uploadService.generateSampleCSV();
    const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'apaar_enrolment_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 min-w-0">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Upload student data
      </h1>

      {/* Stepper matching Mockup 2 */}
      <div className="pt-2 pb-4">
        <Stepper currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />
      </div>

      {/* STEP 1: CHOOSE FILE */}
      {currentStep === 1 && (
        <div className="space-y-6 max-w-3xl">
          <div className="border-2 border-dashed border-slate-900 rounded-3xl p-10 bg-white text-center hover:bg-slate-50 transition-colors">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#0B3C88] mb-4">
              <UploadCloud className="h-9 w-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Upload CSV or Excel file</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Upload your institution's student enrolment list with APAAR IDs, names, admission dates, and seat categories.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
                <span className="inline-flex items-center justify-center font-bold rounded-xl text-base px-6 py-3 bg-[#0B3C88] text-white hover:bg-[#072E68] shadow-sm">
                  {isUploading ? 'Inspecting file...' : 'Browse files'}
                </span>
              </label>

              <Button
                variant="outline"
                onClick={handleDownloadTemplate}
                className="border-2 border-[#0B3C88] text-[#0B3C88] font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV Template
              </Button>
            </div>
          </div>

          {/* Quick preset for demo */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-6 w-6 text-[#0B3C88]" />
              <div>
                <p className="text-sm font-bold text-slate-900">Demo Dataset: students_2026.csv (250 rows)</p>
                <p className="text-xs text-slate-600">Preset with 242 valid rows and 8 issues to match mockup.</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setCurrentStep(2)}
              className="bg-[#0B3C88]"
            >
              Load Demo CSV →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: CHECK DATA - EXACT IMPLEMENTATION OF MOCKUP 2 */}
      {currentStep === 2 && (
        <UploadCheckTable
          filename={job.filename}
          totalRows={job.summary.rows_received}
          readyRows={job.summary.accepted}
          rowsToFix={job.rows_to_fix}
          hasConsent={hasConsent}
          onConsentChange={setHasConsent}
          onSubmitReady={handleSubmitReady}
          onDownloadFixList={handleDownloadFixList}
          isSubmitting={isSubmitting}
        />
      )}

      {/* STEP 3: SUBMITTED SUCCESS */}
      {currentStep === 3 && (
        <div className="max-w-2xl bg-white border-2 border-slate-900 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {job.summary.accepted} Records Successfully Submitted!
            </h2>
            <p className="text-slate-600 text-base">
              The accepted records have been persisted to the institution's verified roster.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Submission Job ID:</span>
              <span className="font-mono font-bold text-slate-800">{job.upload_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rows accepted:</span>
              <span className="font-bold text-emerald-700">{job.summary.accepted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rows held for fixing:</span>
              <span className="font-bold text-amber-700">{job.rows_to_fix.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-blue-700 uppercase">COMPLETED_WITH_ISSUES</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => navigate('/students')}
              variant="primary"
              className="w-full sm:w-auto px-6 py-3 bg-[#0B3C88]"
            >
              View Enrolled Students
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 border-[#0B3C88] text-[#0B3C88]"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
