import React from 'react';
import { ShieldCheck, Info, HelpCircle, FileCheck, CheckCircle2 } from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Help & Regulatory Guidelines
        </h1>
        <p className="text-base text-slate-600 mt-1">
          APAAR ID-Based Student Data Management and Verification Platform for AICTE SIH Problem Statement 26263.
        </p>
      </div>

      {/* Official Disclosure Banner */}
      <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
        <div className="flex items-center gap-2 text-[#0B3C88] font-bold text-lg">
          <Info className="w-5 h-5 flex-shrink-0" />
          Prototype Verification Disclosure
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          This system is built for the Smart India Hackathon (SIH 2026). Official government external API integrations with DigiLocker and National Academic Depository (NAD) are simulated using an authoritative, clearly-labelled <strong>Mock Validation Adapter</strong> in development and test environments. Synthetic student records are utilized to safeguard privacy.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              What is an APAAR ID?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Automated Permanent Academic Account Registry (APAAR), also known as "One Nation, One Student ID", is a lifelong 12-digit academic identifier assigned to students in India. It links school, college, degrees, scholarships, and academic credits in the Academic Bank of Credits (ABC).
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Why does an APAAR ID conflict not immediately signify fraud?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Under AICTE regulatory guidelines, a repeated APAAR ID triggers contextual review rather than automatic fraud conclusions. Students frequently transfer between colleges, change programmes, or hold dual degree enrolments permitted by UGC/AICTE. Reviewers inspect admission timelines and transfer certificates before taking action.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              How does the bulk upload process work?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Institutions upload CSV or Excel files containing student lists. The platform performs instant pre-validation checks: detecting missing IDs, invalid lengths, duplicate rows, and excess admissions against sanctioned intake. Only valid rows with student consent are submitted; error rows can be exported for correction.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              How is student privacy protected during third-party verification?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              The verification interface practices data minimization. Employers and background check agencies only receive the minimal attributes needed to confirm authenticity (Student name, Institution, Programme, Admitted Year, Enrolment status). Private personal identifiers and phone/address information stay private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

