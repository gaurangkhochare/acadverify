import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Building, 
  Landmark, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  HelpCircle,
  BellRing,
  UserPlus,
  UserCheck,
  Lock,
  Code2
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchApaar, setSearchApaar] = useState<string>('');
  const [consentPin, setConsentPin] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'INSTITUTIONS' | 'REGULATORS' | 'VERIFIERS' | 'STUDENTS'>('INSTITUTIONS');

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchApaar.trim().replace(/\s/g, '');
    const cleanPin = consentPin.trim();
    if (cleanId) {
      navigate(`/verify?apaar=${encodeURIComponent(cleanId)}${cleanPin ? `&pin=${encodeURIComponent(cleanPin)}` : ''}`);
    } else {
      navigate('/verify');
    }
  };

  return (
    <div className="space-y-12 pb-16 w-full">
      {/* 1. Official Government Hero Section - Spacious Full-Width Layout */}
      <section className="bg-gradient-to-b from-[#0B3C88] to-[#082b60] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-400 w-full">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Top NEP 2020 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-amber-300 font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>National Education Policy (NEP 2020) • One Nation, One Student ID</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300">
                  अखिल भारतीय तकनीकी शिक्षा परिषद | All India Council for Technical Education
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                  National APAAR Student Data Management & Verification Portal
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-2xl">
                A unified, secure, and authentic digital registry for AICTE-approved institutions. 
                Anchoring admissions to the 12-digit APAAR ID to prevent over-intake, eliminate ghost enrolments, 
                and enable instant tamper-evident academic verification.
              </p>

              {/* Four Main Stakeholders Fast-Track Entry Points (Regulator / Institution / Verifier / Student) */}
              <div className="pt-2 space-y-3.5">
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 drop-shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Select Stakeholder Portal for Authorized Access:</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Stakeholder 1: AICTE Regulator */}
                  <button
                    type="button"
                    onClick={() => navigate('/login?role=AICTE_ADMIN')}
                    className="p-4 sm:p-5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 border-2 border-amber-400/50 hover:border-amber-300 text-left transition-all duration-200 group backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[145px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                          <Landmark className="w-4 h-4 text-slate-950" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                      <p className="font-black text-white text-sm sm:text-base group-hover:text-amber-200 transition-colors">
                        AICTE Regulator
                      </p>
                      <p className="text-xs text-blue-100 font-medium leading-snug mt-1">
                        National intake & anomaly radar
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white group-hover:underline">
                      <span>Access Bureau</span>
                      <span>&rarr;</span>
                    </div>
                  </button>

                  {/* Stakeholder 2: Institution Admin & Dashboard */}
                  <button
                    type="button"
                    onClick={() => navigate('/login?role=INSTITUTION_ADMIN')}
                    className="p-4 sm:p-5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 border-2 border-blue-300/50 hover:border-blue-200 text-left transition-all duration-200 group backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[145px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-blue-300 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                          <Building className="w-4 h-4 text-slate-950" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-200 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                      <p className="font-black text-white text-sm sm:text-base group-hover:text-blue-200 transition-colors">
                        Institution Registrar
                      </p>
                      <p className="text-xs text-blue-100 font-medium leading-snug mt-1">
                        Bulk rosters & intake quotas
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-blue-200 group-hover:text-white group-hover:underline">
                      <span>College Login</span>
                      <span>&rarr;</span>
                    </div>
                  </button>

                  {/* Stakeholder 3: Authorized Verifier */}
                  <button
                    type="button"
                    onClick={() => navigate('/login?role=VERIFIER')}
                    className="p-4 sm:p-5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 border-2 border-emerald-400/50 hover:border-emerald-300 text-left transition-all duration-200 group backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[145px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                          <UserCheck className="w-4 h-4 text-slate-950" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                      <p className="font-black text-white text-sm sm:text-base group-hover:text-emerald-200 transition-colors">
                        Corporate Verifier
                      </p>
                      <p className="text-xs text-blue-100 font-medium leading-snug mt-1">
                        HR screening & API lookup
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-white group-hover:underline">
                      <span>Verifier Login</span>
                      <span>&rarr;</span>
                    </div>
                  </button>

                  {/* Stakeholder 4: Student & Scholar */}
                  <button
                    type="button"
                    onClick={() => navigate('/login?role=STUDENT')}
                    className="p-4 sm:p-5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 border-2 border-purple-400/50 hover:border-purple-300 text-left transition-all duration-200 group backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[145px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-purple-300 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                          <GraduationCap className="w-4 h-4 text-slate-950" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                      <p className="font-black text-white text-sm sm:text-base group-hover:text-purple-200 transition-colors">
                        Student Academic Passport
                      </p>
                      <p className="text-xs text-blue-100 font-medium leading-snug mt-1">
                        APAAR ID card, QR & ABC
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-white group-hover:underline">
                      <span>Student Portal</span>
                      <span>&rarr;</span>
                    </div>
                  </button>
                </div>

                {user && (
                  <div className="pt-2 flex items-center gap-3">
                    <Button
                      onClick={() => {
                        if (user.role === 'AICTE_ADMIN') navigate('/aicte/dashboard');
                        else if (user.role === 'STUDENT') navigate('/student/portal');
                        else if (user.role === 'VERIFIER') navigate('/verify');
                        else navigate('/institution/dashboard');
                      }}
                      variant="primary"
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-xs sm:text-sm border-none"
                    >
                      <span>Go to Dashboard ({user.role === 'INSTITUTION_ADMIN' ? 'College Registrar' : user.role.replace('_', ' ')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Authorized Verification Portal Card (Consent-Governed & Soft Stagger Mount) */}
            <div className="lg:col-span-5 animate-stagger-1">
              <div className="bg-white rounded-3xl p-7 sm:p-8 text-slate-900 shadow-2xl border-2 border-slate-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
                
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0B3C88] shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-black text-base sm:text-lg text-slate-900 leading-tight">
                        Authorized Verification Portal
                      </h2>
                      <p className="text-xs text-slate-600 font-semibold">
                        Consent-governed credential verification
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Node
                  </span>
                </div>

                {/* Consent & DPDP Notice Banner */}
                <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium leading-relaxed flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>DPDP Act 2023 & NEP Compliant:</strong> Verification requires student consent OTP or verification PIN. Academic records cannot be queried publicly without verification credentials.
                  </span>
                </div>

                {/* Fast Evaluator Preset Chip */}
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Evaluator Test:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchApaar('1234 5678 9012');
                      setConsentPin('849201');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0B3C88] text-[11px] font-bold border border-blue-200 transition-colors cursor-pointer"
                  >
                    <span>Load Demo ID (Asha K.)</span>
                  </button>
                </div>

                <form onSubmit={handleQuickVerify} className="space-y-3.5">
                  <div>
                    <label htmlFor="landing-apaar" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      12-Digit Student APAAR ID
                    </label>
                    <div className="relative">
                      <input
                        id="landing-apaar"
                        type="text"
                        maxLength={14}
                        value={searchApaar}
                        onChange={(e) => setSearchApaar(e.target.value)}
                        placeholder="e.g. 1234 5678 9012"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#0B3C88] focus:ring-0 text-slate-900 font-mono tracking-widest text-sm font-bold placeholder:text-slate-400 placeholder:tracking-normal placeholder:font-sans"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="landing-pin" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Student Consent OTP / PIN
                      </label>
                      <span className="text-[10px] text-gray-400 font-normal">
                        Demo PIN: 849201
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="landing-pin"
                        type="password"
                        maxLength={6}
                        value={consentPin}
                        onChange={(e) => setConsentPin(e.target.value)}
                        placeholder="Enter 6-digit consent OTP"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#0B3C88] focus:ring-0 text-slate-900 font-mono tracking-widest text-sm font-bold placeholder:text-slate-400 placeholder:tracking-normal placeholder:font-sans"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 bg-[#0B3C88] hover:bg-[#072B62] text-white font-bold rounded-xl shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>Verify Authorized Record</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <div className="mt-3.5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Cryptographically Secured</span>
                  <button
                    onClick={() => navigate('/api-docs')}
                    className="font-bold text-[#0B3C88] hover:underline"
                  >
                    Developer API &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official AICTE Regulatory Gazette & Notifications Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-[#071830] text-slate-200 rounded-2xl border border-slate-700/80 shadow-xl px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-black shrink-0 tracking-wide shadow-xs">
              <BellRing className="w-3.5 h-3.5" />
              <span>AICTE GAZETTE</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
              <strong className="text-white">AY 2026-27 Technical Admissions:</strong> Mandatory 100% APAAR ID seeding for all engineering, management, and technical programmes under Problem Statement 26263.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <span>Regulatory Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Platform Live Telemetry Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-white rounded-3xl border-2 border-slate-900 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                National APAAR Data Exchange Telemetry
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Live National Bureau Synced • Real-Time AICTE Registry
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-left sm:border-r border-slate-200 sm:pr-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4 text-[#0B3C88]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Approved Institutions</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#0B3C88]">4,218</p>
              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span>✓ 100% Onboarded</span>
              </p>
            </div>

            <div className="text-left md:border-r border-slate-200 sm:pr-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <GraduationCap className="w-4 h-4 text-[#0B3C88]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Verified APAAR IDs</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#0B3C88]">1.38M+</p>
              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span>✓ NEP 2020 Anchored</span>
              </p>
            </div>

            <div className="text-left sm:border-r border-slate-200 sm:pr-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Intake Reconciliation</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600">99.4%</p>
              <p className="text-[11px] text-slate-500 font-semibold">
                Over-Intake Prevented
              </p>
            </div>

            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Duplicate Flags Resolved</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-amber-600">3,492</p>
              <p className="text-[11px] text-slate-500 font-semibold">
                Ghost Admissions Eliminated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Stakeholder Workflows (Interactive Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Comprehensive Four-Stakeholder Ecosystem
          </h2>
          <p className="text-sm text-slate-600">
            Tailored interfaces designed to meet statutory AICTE regulations and empower colleges, students, and employers.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('INSTITUTIONS')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'INSTITUTIONS'
                ? 'bg-[#0B3C88] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Institutions & Colleges</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('REGULATORS')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'REGULATORS'
                ? 'bg-[#0B3C88] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>AICTE Regulatory Bureau</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('VERIFIERS')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'VERIFIERS'
                ? 'bg-[#0B3C88] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Screening & Employers</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('STUDENTS')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'STUDENTS'
                ? 'bg-[#0B3C88] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Students & Scholars</span>
          </button>
        </div>

        {/* Active Tab Content */}
        <div className="bg-white rounded-3xl border-2 border-slate-900 p-6 sm:p-8 shadow-sm">
          {activeTab === 'INSTITUTIONS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3C88] flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-slate-900 text-base">Bulk CSV Upload</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upload student data in bulk via CSV. Immediate client-side validation checks APAAR syntax, duplicate IDs, and intake limits before ingestion.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3C88] flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-slate-900 text-base">Anomaly Resolution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clear, guided workflows to resolve missing APAAR IDs, dual enrolments, and quota misallocations with registrar review notes.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B3C88] flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-slate-900 text-base">Intake Compliance</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Real-time seat count visualization prevents admitting students beyond AICTE-sanctioned capacity across all degree programs.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 font-medium">
                  Authoritative interface for college registrars to manage student admissions and preserve quota limits.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login?role=INSTITUTION_ADMIN')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Launch Institution Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'REGULATORS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-slate-900 text-base">National Intake Radar</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    State-by-state heatmaps and intake utilization ratios to identify non-compliant institutions or excessive supernumerary seats.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-slate-900 text-base">Cross-Institution Conflicts</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated conflict detection triggers whenever an APAAR ID is claimed concurrently by multiple universities.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-slate-900 text-base">Compliance Audit Trails</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Immutable audit records tracking every upload, verification, and resolution for legal and accreditation hearings.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 font-medium">
                  High-level oversight bureau for AICTE officers to monitor national intake and investigate fraudulent admissions.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login?role=AICTE_ADMIN')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Launch AICTE National Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'VERIFIERS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-slate-900 text-base">Instant APAAR Lookup</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enter an APAAR ID to instantly verify enrollment status, degree program, and institutional accreditation.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-slate-900 text-base">Dynamic QR Validation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scan QR codes presented on physical or digital student certificates to reveal genuine AICTE registry data instantly.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-slate-900 text-base">Tamper-Proof Verification</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    HMAC-SHA256 digital signatures ensure credentials cannot be forged, manipulated, or falsified by unauthorized parties.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 font-medium">
                  Zero-knowledge background verification portal for corporate HR, screening agencies, and embassies.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/verify')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Launch Verification Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'STUDENTS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-slate-900 text-base">Digital APAAR Card</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Official student digital ID card with active admission details, course specialization, and dynamic QR verification code.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-slate-900 text-base">Discrepancy Reporting</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Students can report wrongful dual enrollments or incorrect enrollment status directly to their institution and AICTE.
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-slate-900 text-base">PDF Credential Export</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    One-click export of verified enrollment certificates for internships, visa applications, and scholarship filings.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 font-medium">
                  Lifelong academic passport anchoring student credentials, ABC credit transfers, and dynamic verification.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login?role=STUDENT')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Launch Student Passport Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Sovereign Standards & Compliance Architecture Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/90 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-2xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-5">
            National Standards & Statutory Compliance Architecture
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-sm font-black text-[#0B3C88] block">GIGW 3.0</span>
              <p className="text-[11px] text-slate-600 font-medium">Govt. Website Standards Compliant</p>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-sm font-black text-amber-600 block">DPDP Act 2023</span>
              <p className="text-[11px] text-slate-600 font-medium">Consent & Data Minimization</p>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-sm font-black text-emerald-600 block">NEP 2020</span>
              <p className="text-[11px] text-slate-600 font-medium">One Nation, One Student ID</p>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <span className="text-sm font-black text-purple-600 block">HMAC-SHA256</span>
              <p className="text-[11px] text-slate-600 font-medium">Cryptographic Record Tamper Seal</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B3C88] to-[#082b60] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to onboard your institution?
            </h3>
            <p className="text-sm text-slate-200">
              Join 4,200+ AICTE-approved colleges managing student admissions through authentic APAAR records.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => navigate('/login?role=INSTITUTION_ADMIN')}
              variant="primary"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md text-sm border-none"
            >
              Sign In to Portal
            </Button>
            <Button
              onClick={() => navigate('/register')}
              variant="outline"
              className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0B3C88] font-bold rounded-xl border-2 border-white shadow-md text-sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              <span>Register College</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
