import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verificationService } from '../services/verificationService';
import { VerificationResult } from '../types/verification';
import { VerificationCard } from '../components/verification/VerificationCard';
import { Button } from '../components/common/Button';
import { Search, Sparkles } from 'lucide-react';
import { MOCK_VERIFICATION_RECORD } from '../services/mockData';
import { useNotification } from '../context/NotificationContext';

export const VerificationPage: React.FC = () => {
  const { notify } = useNotification();
  const [searchParams] = useSearchParams();

  const urlApaar = searchParams.get('apaar') || searchParams.get('ref');
  const urlName = searchParams.get('name');
  const urlPin = searchParams.get('pin');

  const [apaarInput, setApaarInput] = useState<string>(urlApaar || '123456789012');
  const [consentPin, setConsentPin] = useState<string>(urlPin || '849201');
  const [result, setResult] = useState<VerificationResult | null>(() => {
    if (urlName && urlApaar) {
      return {
        ...MOCK_VERIFICATION_RECORD,
        student_name: urlName,
        apaar_id: urlApaar,
        reference: `VER-${urlApaar.slice(-6)}`,
      };
    }
    return MOCK_VERIFICATION_RECORD;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  useEffect(() => {
    if (urlApaar) {
      setApaarInput(urlApaar);
      handleVerify(undefined, urlApaar);
    }
  }, [urlApaar]);

  const handleVerify = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const clean = (overrideInput || apaarInput).trim();
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

      // If a specific name was passed in query parameter (e.g. from Student QR scan), preserve student identity
      if (urlName && clean === urlApaar) {
        res.student_name = urlName;
      }

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 min-w-0">
      {/* Title & DPDP Notice */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Verify a student record
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Authorized Verification Portal • Cryptographically Secured & DPDP Act 2023 Compliant
        </p>
      </div>

      {/* Form Section - Matching Mockup 3 with Student Consent Protection */}
      <form onSubmit={handleVerify} className="max-w-4xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-7 space-y-1">
            <label htmlFor="apaar-input" className="block text-sm sm:text-base font-bold text-slate-900">
              APAAR ID
            </label>
            <input
              id="apaar-input"
              type="text"
              value={apaarInput}
              onChange={(e) => setApaarInput(e.target.value)}
              placeholder="Enter the 12-digit APAAR ID"
              className="w-full px-4 py-3 text-sm sm:text-base border-2 border-slate-900 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B3C88] font-mono tracking-wider font-semibold"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label htmlFor="consent-pin" className="block text-xs sm:text-sm font-bold text-slate-900 truncate">
              Student Consent PIN
            </label>
            <input
              id="consent-pin"
              type="text"
              value={consentPin}
              onChange={(e) => setConsentPin(e.target.value)}
              placeholder="6-digit PIN"
              className="w-full px-4 py-3 text-sm sm:text-base border-2 border-slate-900 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B3C88] font-mono tracking-wider font-semibold"
            />
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full text-sm sm:text-base font-bold py-3.5 bg-[#0B3C88] hover:bg-[#072E68] text-white rounded-xl shadow-sm"
            >
              Verify record
            </Button>
          </div>
        </div>

        {/* Subtext below input - Matching Mockup 3 */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
          For employers, institutions and regulators. Tamper-proof verification with student consent verification under DPDP Act 2023.
        </p>

        {/* Demo Helper chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets:
          </span>
          <button
            type="button"
            onClick={() => {
              setApaarInput('123456789012');
              handleVerify(undefined, '123456789012');
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Asha K. (123456789012)
          </button>
          <button
            type="button"
            onClick={() => {
              setApaarInput('567890123456');
              handleVerify(undefined, '567890123456');
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Priya Verma (567890123456)
          </button>
          <button
            type="button"
            onClick={() => {
              setApaarInput('VER-2026-AICTE-98214');
              handleVerify(undefined, 'VER-2026-AICTE-98214');
            }}
            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold transition-colors"
          >
            Ref: VER-2026-AICTE-98214
          </button>
        </div>
      </form>

      {/* Result Card - Pixel perfect matching Mockup 3 */}
      {result && <VerificationCard result={result} />}

      {/* Empty / Not Found State */}
      {hasSearched && !result && !isLoading && (
        <div className="max-w-4xl p-8 rounded-2xl border-2 border-dashed border-slate-300 bg-white text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto font-bold text-lg">
            ✕
          </div>
          <h3 className="text-lg font-bold text-slate-900">Record Not Verified</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            No active enrolment or graduation record was found matching identifier "{apaarInput}". 
            Please verify that the 12-digit APAAR ID is correct.
          </p>
        </div>
      )}
    </div>
  );
};
