import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';
import { VerificationResult } from '../../types/verification';

export interface VerificationCardProps {
  result: VerificationResult;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({ result }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    const cleanId = (result.apaar_id || '123456789012').replace(/\D/g, '');
    const payload = `${window.location.origin}/verify?apaar=${encodeURIComponent(cleanId)}&name=${encodeURIComponent(result.student_name)}`;
    QRCode.toDataURL(payload, { width: 140, margin: 1, color: { dark: '#0B3C88', light: '#FFFFFF' } })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [result]);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Main Verification Result Card */}
      <div className="rounded-2xl border-2 border-slate-900 overflow-hidden bg-white shadow-sm">
        {/* Header Banner */}
        <div className="bg-[#EBF2FE] border-b-2 border-slate-900 px-6 py-4 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#0B3C88] text-white flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[3]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Record verified
          </h2>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Details Table / Grid */}
          <div className="space-y-3.5 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
              <span className="w-32 font-bold text-slate-700 flex-shrink-0">Student</span>
              <span className="font-extrabold text-slate-900">{result.student_name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
              <span className="w-32 font-bold text-slate-700 flex-shrink-0">Institution</span>
              <span className="font-extrabold text-slate-900">{result.institution_name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
              <span className="w-32 font-bold text-slate-700 flex-shrink-0">Programme</span>
              <span className="font-extrabold text-slate-900">{result.programme_name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
              <span className="w-32 font-bold text-slate-700 flex-shrink-0">Admitted</span>
              <span className="font-extrabold text-slate-900">{result.admission_year}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
              <span className="w-32 font-bold text-slate-700 flex-shrink-0">Status</span>
              <span className="font-extrabold text-[#0B3C88]">{result.enrolment_status}</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-900 rounded-2xl w-44 h-44 bg-slate-50 flex-shrink-0 self-center md:self-auto">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Verification QR code"
                className="w-28 h-28 object-contain"
              />
            ) : (
              <div className="text-center font-bold text-xs text-slate-700">
                Generating QR...
              </div>
            )}
            <span className="mt-2 text-[11px] font-bold text-slate-800 text-center uppercase tracking-wider">
              Scan to verify
            </span>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="border-t-2 border-slate-900 px-6 py-4 bg-white text-slate-900 font-bold text-xs sm:text-sm">
          Digital signature is valid. Checked on {result.checked_at}.
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="rounded-2xl border-2 border-slate-900 bg-slate-100 p-5 text-slate-800 font-medium text-xs sm:text-sm">
        {result.disclaimer}
      </div>
    </div>
  );
};
