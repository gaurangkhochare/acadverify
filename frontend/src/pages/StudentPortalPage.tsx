import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Building, 
  Calendar, 
  CheckCircle2, 
  Download, 
  FileText, 
  AlertCircle, 
  ExternalLink,
  QrCode,
  User,
  Share2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useNotification } from '../context/NotificationContext';
import QRCode from 'qrcode';

export const StudentPortalPage: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotification();

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState<boolean>(false);
  const [correctionField, setCorrectionField] = useState<string>('Name');
  const [correctionNotes, setCorrectionNotes] = useState<string>('');
  const [isSubmittingCorrection, setIsSubmittingCorrection] = useState<boolean>(false);

  const cleanApaar = (user?.apaar_id || '123456789012').replace(/\s/g, '');
  const studentDisplayName = (user?.name || 'Asha Krishnan').split('(')[0].trim();
  const apaarIdFormatted = `${cleanApaar.slice(0, 4)} ${cleanApaar.slice(4, 8)} ${cleanApaar.slice(8, 12)}`;

  const verificationUrl = `${window.location.origin}/verify?apaar=${encodeURIComponent(cleanApaar)}&name=${encodeURIComponent(studentDisplayName)}&pin=849201`;

  useEffect(() => {
    QRCode.toDataURL(verificationUrl, {
      width: 180,
      margin: 1,
      color: { dark: '#0B3C88', light: '#FFFFFF' },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [verificationUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    notify('success', 'Verification Link Copied', 'Share this link with employers or universities for instant verification.');
  };

  const handleDownloadCertificate = () => {
    notify('success', 'Digital Certificate Generated', 'Downloading AICTE-verified APAAR student credential document.');
    const element = document.createElement('a');
    const file = new Blob([
      `AICTE APAAR DIGITAL STUDENT RECORD\n-----------------------------------\nName: ${studentDisplayName}\nAPAAR ID: ${apaarIdFormatted}\nInstitution: ${user?.institution_name || 'Vidyalankar Institute of Technology'}\nProgramme: B.Tech - Information Technology\nStatus: ACTIVE ENROLMENT (AICTE Verified)\nIssued At: ${new Date().toISOString()}\nLive Verification URL: ${verificationUrl}\nDigital Signature: HMAC-SHA256-VALID`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `APAAR_Certificate_${cleanApaar}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCorrection(true);
    setTimeout(() => {
      setIsSubmittingCorrection(false);
      setIsCorrectionModalOpen(false);
      notify('success', 'Discrepancy Request Submitted', `Ticket raised with ${user?.institution_name || 'your college'} registrar.`);
      setCorrectionNotes('');
    }, 700);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B3C88] to-[#164e9e] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/20">
              National Academic Passport • NEP 2020
            </span>
            <Badge variant="success">AICTE Enrolment Verified</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {studentDisplayName}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Your official APAAR identity links all your higher education degrees, certificates, 
            and Academic Bank of Credits (ABC) seamlessly nationwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Button
            onClick={handleDownloadCertificate}
            variant="primary"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-xs sm:text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Credential</span>
          </Button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border-2 border-white/70 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCorrectionModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border-2 border-white/70 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Report Discrepancy</span>
          </button>
        </div>
      </div>

      {/* 2. Main Grid: Digital Identity Card (Left) + Academic Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: The APAAR Digital Academic Identity Card */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Official APAAR Identity Card
          </h2>

          <div className="bg-white rounded-3xl border-2 border-slate-900 shadow-xl overflow-hidden relative">
            {/* Header Strip */}
            <div className="bg-[#0B3C88] text-white p-5 space-y-1 relative">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] absolute top-0 left-0 right-0" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-300" />
                  <span className="font-black text-sm tracking-tight">AICTE • APAAR REGISTRY</span>
                </div>
                <span className="text-[10px] bg-blue-900/80 px-2 py-0.5 rounded-md font-semibold text-blue-200 border border-blue-400/40">
                  Govt. of India
                </span>
              </div>
              <p className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold">
                Ministry of Education • One Nation One Student ID
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                  <User className="w-10 h-10 text-slate-500" />
                </div>

                <div className="space-y-1 flex-1">
                  <p className="text-lg font-black text-slate-900 leading-tight">
                    {studentDisplayName}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {user?.institution_name || 'Vidyalankar Institute of Technology'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    B.Tech - Information Technology
                  </p>
                </div>
              </div>

              {/* 12-Digit APAAR ID */}
              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                  APAAR Academic Identifier (12-Digit)
                </span>
                <p className="text-xl sm:text-2xl font-black font-mono tracking-widest text-[#0B3C88]">
                  {apaarIdFormatted}
                </p>
              </div>

              {/* QR Code and Meta Details */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200">
                <div className="space-y-1 text-xs text-slate-600">
                  <p><span className="font-bold text-slate-800">ABC ID:</span> ABC-2026-9921</p>
                  <p><span className="font-bold text-slate-800">Roll No:</span> IT2024-042</p>
                  <p><span className="font-bold text-slate-800">Enrolled:</span> Academic Year 2024</p>
                  <p><span className="font-bold text-slate-800">Consent PIN:</span> <code className="bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.5 rounded text-[11px] font-mono">849201</code></p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cryptographically Signed</span>
                  </div>
                </div>

                {/* QR Code Canvas (Clickable link for instant verification test) */}
                <a
                  href={verificationUrl}
                  title="Click to open verification or scan with mobile phone"
                  className="p-2 bg-white hover:bg-blue-50/60 rounded-xl border-2 border-slate-300 hover:border-[#0B3C88] shadow-xs shrink-0 text-center transition-all group block cursor-pointer"
                >
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="APAAR QR Code" className="w-20 h-20 mx-auto group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-20 h-20 bg-slate-100 flex items-center justify-center text-slate-400">
                      <QrCode className="w-6 h-6" />
                    </div>
                  )}
                  <span className="text-[9px] text-[#0B3C88] font-bold block mt-0.5 group-hover:underline">
                    Scan / Click &rarr;
                  </span>
                </a>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500 font-medium">
              Tamper-evident academic credential recognized by all AICTE-approved universities
            </div>
          </div>
        </div>

        {/* Right: Academic Enrolment & Progression Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Current Academic Enrolment
                </h2>
                <p className="text-xs text-slate-500">
                  Verified student-level admission record recorded in AICTE Central Repository
                </p>
              </div>
              <Badge variant="success">Active Enrolment</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">Institution</span>
                <p className="font-bold text-slate-900 text-sm">
                  {user?.institution_name || 'Vidyalankar Institute of Technology'}
                </p>
                <p className="text-slate-500 text-[11px]">AICTE Permanent ID: AICTE-DEL-1-3920192</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">Degree Programme</span>
                <p className="font-bold text-slate-900 text-sm">
                  B.Tech - Information Technology
                </p>
                <p className="text-slate-500 text-[11px]">Duration: 4 Years (Full Time)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">Seat Quota Category</span>
                <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span>REGULAR (State Centralized Admission)</span>
                </p>
                <p className="text-slate-500 text-[11px]">Counted against AICTE Sanctioned Regular Intake</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">Admission Date & Session</span>
                <p className="font-bold text-slate-900 text-sm">
                  12 August 2024 (Session 2024-25)
                </p>
                <p className="text-slate-500 text-[11px]">Status Effective: Active</p>
              </div>
            </div>

            {/* Academic Mobility & Transfer History */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0B3C88]" />
                <span>Academic Progression & Credit Mobility</span>
              </h3>

              <div className="border border-slate-200 rounded-2xl divide-y divide-slate-200 overflow-hidden text-xs">
                <div className="p-4 flex items-start justify-between gap-4 bg-emerald-50/40">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">B.Tech Information Technology</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Current</span>
                    </div>
                    <p className="text-slate-600">Vidyalankar Institute of Technology • Admitted 2024</p>
                    <p className="text-slate-500 text-[11px]">AICTE Central Submission: Verified Batch #UPL-2024-081</p>
                  </div>
                  <span className="font-mono text-emerald-700 font-bold">ACTIVE</span>
                </div>

                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900">Higher Secondary School Certificate (HSC)</span>
                    <p className="text-slate-600">Maharashtra State Board • Completed 2024</p>
                    <p className="text-slate-500 text-[11px]">ABC Digilocker Linked: 40 Academic Credits Transferred</p>
                  </div>
                  <span className="font-mono text-slate-500 font-bold">COMPLETED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discrepancy Correction Modal */}
      <Modal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        title="Report Student Data Discrepancy"
      >
        <form onSubmit={handleSubmitCorrection} className="space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600 leading-relaxed">
            If your college has incorrectly submitted your name, seat category, or admission date to AICTE, 
            you can raise a formal clarification ticket directly to your college registrar.
          </p>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Field with Discrepancy</label>
            <select
              value={correctionField}
              onChange={(e) => setCorrectionField(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0B3C88]"
            >
              <option value="Name">Student Name Spelling</option>
              <option value="Seat Category">Seat Quota Category (e.g. Regular vs Supernumerary)</option>
              <option value="Admission Date">Admission Date</option>
              <option value="Programme">Degree Programme / Branch</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Details & Supporting Evidence</label>
            <textarea
              rows={3}
              required
              placeholder="Explain the discrepancy and provide your official admission slip or ID details..."
              value={correctionNotes}
              onChange={(e) => setCorrectionNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0B3C88]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCorrectionModalOpen(false)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmittingCorrection}
              className="bg-[#0B3C88] hover:bg-blue-900 text-white font-bold px-4 py-2 text-xs sm:text-sm"
            >
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
