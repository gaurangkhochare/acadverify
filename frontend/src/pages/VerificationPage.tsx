import React, { useState } from 'react';
import { verificationService } from '../services/verificationService';
import { VerificationResult } from '../types/verification';
import { VerificationCard } from '../components/verification/VerificationCard';
import { Button } from '../components/common/Button';
import { Search, Sparkles } from 'lucide-react';
import { MOCK_VERIFICATION_RECORD } from '../services/mockData';
import { useNotification } from '../context/NotificationContext';

export const VerificationPage: React.FC = () => {
  const { notify } = useNotification();
  const [apaarInput, setApaarInput] = useState<string>('123456789012'); // default to sample 12-digit APAAR ID
  const [result, setResult] = useState<VerificationResult | null>(MOCK_VERIFICATION_RECORD); // pre-populated to match Mockup 3!
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = apaarInput.trim();
    if (!clean) {
      notify('warning', 'Input required', 'Please enter a 12-digit APAAR ID or verification reference.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await verificationService.verifyRecord({
        apaar_id: clean,
        reference: clean.startsWith('VER-') ? clean : undefined,
      });
      setResult(res);
      setHasSearched(true);
      notify('success', 'Verification complete', `Verified record for ${res.student_name}`);
    } catch {
      notify('error', 'Verification failed', 'Record could not be verified.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Verify a student record
      </h1>

      {/* Form Section - Matching Mockup 3 */}
      <form onSubmit={handleVerify} className="max-w-4xl space-y-2">
        <label htmlFor="apaar-input" className="block text-base sm:text-lg font-black text-slate-900">
          APAAR ID
        </label>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              id="apaar-input"
              type="text"
              value={apaarInput}
              onChange={(e) => setApaarInput(e.target.value)}
              placeholder="Enter the 12-digit APAAR ID"
              className="w-full px-5 py-3.5 text-base sm:text-lg border-2 border-slate-900 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B3C88] font-medium"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="text-base sm:text-lg font-bold px-8 py-3.5 bg-[#0B3C88] hover:bg-[#072E68] text-white rounded-xl shadow-sm sm:flex-shrink-0"
          >
            Verify record
          </Button>
        </div>

        {/* Subtext below input - Matching Mockup 3 */}
        <p className="text-sm sm:text-base text-slate-600 font-medium pt-1">
          For employers, institutions and regulators. No login needed for basic checks.
        </p>

        {/* Demo Helper chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo presets:
          </span>
          <button
            type="button"
            onClick={() => {
              setApaarInput('123456789012');
              handleVerify();
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Asha K. (123456789012)
          </button>
          <button
            type="button"
            onClick={() => {
              setApaarInput('567890123456');
              handleVerify();
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Priya Verma (567890123456)
          </button>
          <button
            type="button"
            onClick={() => {
              setApaarInput('VER-2026-AICTE-98214');
              handleVerify();
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Token: VER-2026-AICTE-98214
          </button>
        </div>
      </form>

      {/* Verification Card Result - Matching Mockup 3 */}
      {result && <VerificationCard result={result} />}

      {/* Empty / Not found state */}
      {!result && hasSearched && !isLoading && (
        <div className="max-w-4xl p-8 rounded-2xl border-2 border-slate-900 bg-white text-center space-y-3">
          <p className="text-lg font-bold text-slate-800">No verified student record found</p>
          <p className="text-sm text-slate-600">
            The identifier provided did not match any active verified enrolment. Please check the 12-digit number or contact the issuing institution.
          </p>
        </div>
      )}
    </div>
  );
};

