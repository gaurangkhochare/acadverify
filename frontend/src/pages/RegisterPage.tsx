import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, RegistrationPayload } from '../types/auth';
import { 
  Building, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Landmark
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNotification } from '../context/NotificationContext';

export const RegisterPage: React.FC = () => {
  const { register, loginWithJanParichay } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [selectedRole, setSelectedRole] = useState<'INSTITUTION_ADMIN' | 'VERIFIER'>('INSTITUTION_ADMIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSsoLoading, setIsSsoLoading] = useState<boolean>(false);

  // Common fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('registrar@college.ac.in');
  const [password, setPassword] = useState<string>('');

  // Institution fields
  const [aicteReference, setAicteReference] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [designation, setDesignation] = useState<string>('Registrar / Nodal Officer');

  // Verifier fields
  const [organizationName, setOrganizationName] = useState<string>('');
  const [verificationPurpose, setVerificationPurpose] = useState<string>('Employment Background Verification');

  const [agreed, setAgreed] = useState<boolean>(false);

  const handleRoleSelect = (role: 'INSTITUTION_ADMIN' | 'VERIFIER') => {
    setSelectedRole(role);
    if (role === 'INSTITUTION_ADMIN') {
      setEmail('registrar@college.ac.in');
    } else if (role === 'VERIFIER') {
      setEmail('verification@corporate.com');
    }
  };

  const handleNationalSso = async () => {
    try {
      setIsSsoLoading(true);
      const user = await loginWithJanParichay();
      notify('success', 'Jan Parichay National SSO', `Verified & authenticated as ${user.name}`);
      if (selectedRole === 'INSTITUTION_ADMIN') navigate('/institution/dashboard');
      else if (selectedRole === 'VERIFIER') navigate('/verify');
      else navigate('/');
    } catch {
      notify('error', 'National SSO Error', 'Could not complete Jan Parichay authentication.');
    } finally {
      setIsSsoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      notify('error', 'Affirmation Required', 'Please confirm the regulatory truthfulness declaration.');
      return;
    }

    if (selectedRole === 'INSTITUTION_ADMIN' && !state) {
      notify('error', 'State Required', 'Please select your State / Union Territory.');
      return;
    }

    try {
      setIsLoading(true);
      const payload: RegistrationPayload = {
        role: selectedRole,
        name: name || (selectedRole === 'INSTITUTION_ADMIN' ? 'Prof. Registrar' : 'Verified Verifier'),
        email,
        password,
        aicte_reference: aicteReference,
        institution_name: institutionName,
        state,
        designation,
        organization_name: organizationName,
        verification_purpose: verificationPurpose,
      };

      const user = await register(payload);
      notify('success', 'Account Registered Successfully', `Welcome to APAAR Portal, ${user.name}`);

      if (selectedRole === 'INSTITUTION_ADMIN') {
        navigate('/institution/dashboard');
      } else if (selectedRole === 'VERIFIER') {
        navigate('/verify');
      } else {
        navigate('/');
      }
    } catch {
      notify('error', 'Registration Failed', 'Please verify the submitted details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0B3C88] text-white flex items-center justify-center shadow-md">
          <ShieldCheck className="w-8 h-8 text-amber-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Register on AICTE APAAR Platform
        </h1>
        <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
          One Nation, One Academic Identity Registry • NEP 2020
        </p>
      </div>

      {/* STEP 1: Balanced 4-Card Role Grid with Visual RBAC Locking */}
      <div className="space-y-4 mb-10">
        <div className="text-center">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center justify-center gap-1.5">
            <span>Step 1: Select Your Stakeholder Role</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Institution (Selectable & Enhanced Active State) */}
          <button
            type="button"
            onClick={() => handleRoleSelect('INSTITUTION_ADMIN')}
            className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
              selectedRole === 'INSTITUTION_ADMIN'
                ? 'border-[#0B3C88] bg-blue-50 ring-4 ring-blue-200/80 shadow-md'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedRole === 'INSTITUTION_ADMIN' ? 'bg-[#0B3C88] text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Building className="w-5 h-5" />
                </div>
                {selectedRole === 'INSTITUTION_ADMIN' ? (
                  <div className="w-7 h-7 rounded-full bg-[#0B3C88] text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-slate-300" />
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Institution</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                For College Registrars, Deans & Nodal Officers submitting annual student admissions.
              </p>
            </div>
            {selectedRole === 'INSTITUTION_ADMIN' ? (
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C88] bg-blue-100/90 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected Stakeholder
              </span>
            ) : (
              <span className="mt-4 text-xs font-bold text-slate-500 hover:text-[#0B3C88] transition-colors">
                Click to Select &rarr;
              </span>
            )}
          </button>

          {/* Card 2: Employer / Verifier (Selectable & Enhanced Active State) */}
          <button
            type="button"
            onClick={() => handleRoleSelect('VERIFIER')}
            className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
              selectedRole === 'VERIFIER'
                ? 'border-[#0B3C88] bg-blue-50 ring-4 ring-blue-200/80 shadow-md'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedRole === 'VERIFIER' ? 'bg-[#0B3C88] text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                {selectedRole === 'VERIFIER' ? (
                  <div className="w-7 h-7 rounded-full bg-[#0B3C88] text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-slate-300" />
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Employer / Verifier</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                For Corporate HR, Screening Agencies & Embassies verifying credentials with consent.
              </p>
            </div>
            {selectedRole === 'VERIFIER' ? (
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C88] bg-blue-100/90 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected Stakeholder
              </span>
            ) : (
              <span className="mt-4 text-xs font-bold text-slate-500 hover:text-[#0B3C88] transition-colors">
                Click to Select &rarr;
              </span>
            )}
          </button>

          {/* Card 3: Student / Scholar (Visually Locked / Disabled RBAC) */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/90 opacity-60 text-left relative flex flex-col justify-between select-none cursor-not-allowed">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Log-in Only</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-700 text-base">Student / Scholar</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Student accounts are linked to DigiLocker / ABC. Please log in directly via the Student Portal.
              </p>
            </div>
            <Link 
              to="/login?role=STUDENT" 
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#0B3C88] hover:underline cursor-pointer"
            >
              <span>Go to Student Login &rarr;</span>
            </Link>
          </div>

          {/* Card 4: AICTE Regulator (Visually Locked / Disabled RBAC) */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/90 opacity-60 text-left relative flex flex-col justify-between select-none cursor-not-allowed">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Internal Only</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-700 text-base">AICTE Regulator</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Internal regulatory accounts are provisioned by AICTE Bureau. Self-registration is strictly disabled.
              </p>
            </div>
            <Link 
              to="/login?role=AICTE_ADMIN" 
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#0B3C88] hover:underline cursor-pointer"
            >
              <span>Go to Regulator Login &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Registration Box (Step 2) */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-900 shadow-xl space-y-6">
        
        {/* Step 2 Subheading */}
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Step 2: Official {selectedRole === 'INSTITUTION_ADMIN' ? 'Institution Registration' : 'Verifier Credential Onboarding'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            All submitted credentials are electronically audited against the AICTE Approval Database.
          </p>
        </div>

        {/* Official Government SSO Authentication Button (Styled as a Primary Action Button) */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center text-center py-2 space-y-2">
            <button
              type="button"
              onClick={handleNationalSso}
              disabled={isSsoLoading}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#0B3C88] hover:bg-[#072559] active:bg-[#051733] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all border-2 border-[#0B3C88] focus:ring-4 focus:ring-blue-200 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
              <span>
                {isSsoLoading 
                  ? 'Connecting to National Gateway...' 
                  : 'Authenticate via Jan Parichay (National SSO)'
                }
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                <Lock className="w-3 h-3" /> Govt. of India
              </span>
            </button>
            <p className="text-xs text-slate-500 font-medium">
              Fast-track institutional verification via MeriPehchan / DigiLocker National SSO
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                — OR ENTER DETAILS MANUALLY —
              </span>
            </div>
          </div>
        </div>

        {/* The Adaptive Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* A. Role: Institution Admin */}
          {selectedRole === 'INSTITUTION_ADMIN' && (
            <div className="space-y-4">
              {/* Informational Alert Box */}
              <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200/90 flex items-start gap-3 shadow-xs">
                <div className="p-1 rounded-lg bg-blue-100 text-[#0B3C88] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                  <strong className="font-bold text-[#0B3C88]">AICTE Approval Mandate:</strong> Only institutions with a verified 
                  Permanent Institute ID issued in the current Approval Process Handbook (APH) may register. 
                  Submitted student rosters are cross-referenced directly with sanctioned intake limits.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="aicte-id-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    AICTE Permanent Institute ID *
                  </label>
                  <input
                    id="aicte-id-input"
                    type="text"
                    required
                    placeholder="e.g. 1-3324521401"
                    value={aicteReference}
                    onChange={(e) => setAicteReference(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-mono tracking-wider font-semibold bg-white text-slate-900 shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="state-select" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    * STATE / UNION TERRITORY *
                  </label>
                  <select
                    id="state-select"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] bg-white font-medium text-slate-900 shadow-xs"
                  >
                    <option value="" disabled>Select State / Union Territory</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="inst-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Full Institution Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    id="inst-name-input"
                    type="text"
                    required
                    placeholder="e.g. Government Engineering College, Thrissur"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="officer-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Nodal Officer / Registrar Name *
                  </label>
                  <input
                    id="officer-name-input"
                    type="text"
                    required
                    placeholder="e.g. Prof. K. R. Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="college-email-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Official College Email (.edu.in / .ac.in) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      id="college-email-input"
                      type="email"
                      required
                      placeholder="e.g. registrar@gectcr.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. Role: Verifier */}
          {selectedRole === 'VERIFIER' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="company-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  id="company-name-input"
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy Services, Infosys, HDFC Bank"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="verifier-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Officer Full Name *
                  </label>
                  <input
                    id="verifier-name-input"
                    type="text"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="verifier-email-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      id="verifier-email-input"
                      type="email"
                      required
                      placeholder="e.g. priya@tcs.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="purpose-select" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Primary Purpose of Verification *
                </label>
                <select
                  id="purpose-select"
                  value={verificationPurpose}
                  onChange={(e) => setVerificationPurpose(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] bg-white font-medium text-slate-900 shadow-xs"
                >
                  <option value="Employment Background Verification">Employment Background Verification</option>
                  <option value="Higher Education Admissions">Higher Education Admissions</option>
                  <option value="Visa & Immigration Screening">Visa & Immigration Screening</option>
                  <option value="Banking & Credential Check">Banking & Credential Check</option>
                </select>
              </div>
            </div>
          )}

          {/* Password field */}
          <div>
            <label htmlFor="password-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Create Portal Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                id="password-input"
                type="password"
                required
                placeholder="Minimum 8 characters with numbers and symbols"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88] focus:border-[#0B3C88] font-medium bg-white text-slate-900 shadow-xs"
              />
            </div>
          </div>

          {/* Legal Compliance Affirmation Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#0B3C88] border-slate-300 rounded focus:ring-[#0B3C88]"
              />
              <span className="leading-relaxed">
                I hereby declare that all details furnished above are authentic. 
                I agree to the <span className="font-bold text-[#0B3C88]">AICTE Regulatory Governance Guidelines</span> and acknowledge compliance with the <span className="font-bold text-[#0B3C88]">Digital Personal Data Protection (DPDP) Act 2023</span>.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full py-3.5 bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <span>Create My Account & Enter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            <span>Already have an institutional or verifier account? </span>
            <Link to="/login" className="font-bold text-[#0B3C88] hover:underline">
              Sign In here &rarr;
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
