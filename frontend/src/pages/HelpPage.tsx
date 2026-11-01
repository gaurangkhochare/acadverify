import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  HelpCircle, 
  FileCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  Lock, 
  Layers 
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
      {/* 1. Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0B3C88] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Regulatory Helpdesk & Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Help & Regulatory Guidelines
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-3xl leading-relaxed">
          Authoritative technical, procedural, and compliance documentation for AICTE-approved institutions, 
          corporate screening verifiers, and students enrolled under the National Education Policy (NEP 2020).
        </p>
      </div>

      {/* Quick Anchor Navigation Links */}
      <div className="flex flex-wrap gap-2 pt-1 pb-3 border-b border-slate-200">
        <a 
          href="#what-is-apaar" 
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B3C88] text-xs font-bold border border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
        >
          What is APAAR ID?
        </a>
        <a 
          href="#conflict-policy" 
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B3C88] text-xs font-bold border border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
        >
          Transfer & Conflict Policy
        </a>
        <a 
          href="#bulk-upload" 
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B3C88] text-xs font-bold border border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
        >
          Bulk Upload & Quota Guard
        </a>
        <a 
          href="#privacy-dpdp" 
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B3C88] text-xs font-bold border border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
        >
          DPDP Act 2023 Privacy
        </a>
        <a 
          href="#api-integration" 
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B3C88] text-xs font-bold border border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
        >
          Campus ERP API Integration
        </a>
      </div>

      {/* 2. Knowledge Base Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: What is APAAR ID? */}
        <div id="what-is-apaar" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3C88] flex items-center justify-center font-bold">
            <Info className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What is APAAR ID?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Automated Permanent Academic Account Registry (APAAR), also known as "One Nation, One Student ID", 
            is an initiative under the National Education Policy (NEP 2020) to assign a lifetime 12-digit 
            digitally-verifiable identification number to each student across India.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className="font-bold text-[#0B3C88]">Statutory Purpose:</p>
            <p>Links secondary and higher education milestones, academic credit deposits (ABC), and prevents ghost enrolments.</p>
          </div>
        </div>

        {/* Card 2: Dual Enrolment & Conflict Policy */}
        <div id="conflict-policy" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Dual Enrolment & Conflict Policy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When an APAAR ID is submitted by College A while already active in College B, the system marks 
            the record as <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono text-xs">CROSS_INSTITUTION_MATCH</code>.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className="font-bold text-amber-800">Resolution Procedure:</p>
            <p>The student must obtain a formal Transfer Certificate (TC) or Migration Certificate, which the registrar uploads to clear the flag.</p>
          </div>
        </div>

        {/* Card 3: Bulk Upload & Quota Validation */}
        <div id="bulk-upload" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Bulk Upload & Quota Validation</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Colleges must upload student rosters via CSV. The platform validates records before saving:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li><strong>Verhoeff Checksum:</strong> Verifies mathematical validity of each 12-digit APAAR ID.</li>
            <li><strong>Sanctioned Intake Guard:</strong> Rejects admissions exceeding AICTE-approved quota limits.</li>
            <li><strong>Duplicate Guard:</strong> Rejects duplicate IDs within the same file.</li>
          </ul>
        </div>

        {/* Card 4: DPDP Act 2023 & Privacy Policy */}
        <div id="privacy-dpdp" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm scroll-mt-24">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">DPDP Act 2023 & Consent Rules</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Under India's Digital Personal Data Protection Act 2023, student academic records cannot be queried publicly 
            without explicit purpose and authorization:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className="font-bold text-purple-900">Verification Requirement:</p>
            <p>Employers and background screening agencies must provide the 12-digit APAAR ID alongside the student-issued 6-digit consent PIN.</p>
          </div>
        </div>
      </div>

      {/* 3. Regulatory Contact & Helpdesk Banner */}
      <div className="bg-gradient-to-r from-[#0B3C88] to-[#082b60] rounded-3xl p-8 sm:p-10 text-white space-y-6 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Need Statutory Nodal Officer Assistance?</h2>
          <p className="text-sm text-slate-200 max-w-2xl">
            AICTE maintains dedicated regional support cells to assist institutions with roster submission, 
            supernumerary quota disputes, and institutional ERP synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Toll Free Support</span>
            </div>
            <p className="font-mono font-bold text-white text-sm">1800-11-2563</p>
            <p className="text-[11px] text-slate-300">Mon - Sat (9:00 AM - 6:00 PM)</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Official Email</span>
            </div>
            <p className="font-mono font-bold text-white text-sm">helpdesk.apaar@aicte-india.org</p>
            <p className="text-[11px] text-slate-300">24-hour turnaround for verified nodal officers</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Headquarters</span>
            </div>
            <p className="font-bold text-white text-xs">Nelson Mandela Marg, Vasant Kunj</p>
            <p className="text-[11px] text-slate-300">New Delhi-110070</p>
          </div>
        </div>
      </div>
    </div>
  );
};
