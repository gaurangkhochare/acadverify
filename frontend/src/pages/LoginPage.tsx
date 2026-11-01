import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Building, 
  Landmark, 
  UserCheck, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/auth';
import { useNotification } from '../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, loginWithJanParichay, switchRole } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [searchParams] = useSearchParams();

  const getEmailForRole = (r: UserRole): string => {
    switch (r) {
      case 'AICTE_ADMIN': return 'regulatory.bureau@aicte-india.org';
      case 'VERIFIER': return 'credentials@tcs-bgv.com';
      case 'STUDENT': return 'asha.krishnan@gmail.com';
      default: return 'registrar@diaet.edu.in';
    }
  };

  const initialRole = (searchParams.get('role') as UserRole) || 'INSTITUTION_ADMIN';
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState<string>(getEmailForRole(initialRole));
  const [password, setPassword] = useState<string>('••••••••');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isJanParichayLoading, setIsJanParichayLoading] = useState<boolean>(false);

  useEffect(() => {
    const qRole = searchParams.get('role') as UserRole;
    if (qRole && ['INSTITUTION_ADMIN', 'AICTE_ADMIN', 'VERIFIER', 'STUDENT'].includes(qRole)) {
      setRole(qRole);
      setEmail(getEmailForRole(qRole));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await login({ email, password, role });
      notify('success', 'Authentication successful', `Signed in as ${user.name}`);
      redirectByRole(user.role);
    } catch {
      notify('error', 'Login failed', 'Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      const user = await loginWithGoogle(role);
      notify('success', 'Google Workspace Authentication', `Verified & signed in as ${user.name}`);
      redirectByRole(user.role);
    } catch {
      notify('error', 'Google Authentication Failed', 'Could not sign in with Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleJanParichayLogin = async () => {
    try {
      setIsJanParichayLoading(true);
      const user = await loginWithJanParichay();
      notify('success', 'Jan Parichay National SSO', `Authenticated as ${user.name}`);
      redirectByRole(user.role);
    } catch {
      notify('error', 'National SSO Error', 'Jan Parichay authentication failed.');
    } finally {
      setIsJanParichayLoading(false);
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchRole(targetRole);
    notify('info', `Switched role to ${targetRole}`);
    redirectByRole(targetRole);
  };

  const redirectByRole = (targetRole: UserRole) => {
    if (targetRole === 'AICTE_ADMIN') {
      navigate('/aicte/dashboard');
    } else if (targetRole === 'STUDENT') {
      navigate('/student/portal');
    } else if (targetRole === 'VERIFIER') {
      navigate('/verify');
    } else {
      navigate('/institution/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-900 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0B3C88] text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to APAAR Portal
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            AICTE Regulatory Data & Verification Platform
          </p>
        </div>

        {/* 1. Quick Evaluator Switchers (Essential for Hackathon Judges) */}
        <div className="space-y-2.5 pt-1 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              1-Click Demo Profiles (For SIH Judges):
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin('INSTITUTION_ADMIN')}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/70 transition-all text-left text-xs bg-white shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Building className="w-4 h-4 text-[#0B3C88] shrink-0" />
                <span>College Admin</span>
              </div>
              <p className="text-slate-500 text-[11px] truncate mt-1">Registrar GEC</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('AICTE_ADMIN')}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/70 transition-all text-left text-xs bg-white shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Landmark className="w-4 h-4 text-[#0B3C88] shrink-0" />
                <span>AICTE Officer</span>
              </div>
              <p className="text-slate-500 text-[11px] truncate mt-1">Regulation Bureau</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('VERIFIER')}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/70 transition-all text-left text-xs bg-white shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <UserCheck className="w-4 h-4 text-[#0B3C88] shrink-0" />
                <span>Employer / BGV</span>
              </div>
              <p className="text-slate-500 text-[11px] truncate mt-1">TCS Verification</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('STUDENT')}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/70 transition-all text-left text-xs bg-white shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <GraduationCap className="w-4 h-4 text-[#0B3C88] shrink-0" />
                <span>Student Portal</span>
              </div>
              <p className="text-slate-500 text-[11px] truncate mt-1">Asha K. (APAAR)</p>
            </button>
          </div>
        </div>

        {/* 2. Federated Single Sign-On (Google & Jan Parichay) */}
        <div className="space-y-2.5">
          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-150 text-xs font-bold text-gray-800 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          {/* Jan Parichay National SSO */}
          <button
            type="button"
            onClick={handleJanParichayLogin}
            disabled={isJanParichayLoading}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-amber-300 bg-white hover:bg-gray-50 hover:border-amber-400 active:bg-amber-50/50 transition-all duration-150 text-xs font-bold text-amber-950 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping shrink-0" />
            <span>Sign in with Jan Parichay (National SSO / MeriPehchan)</span>
          </button>
        </div>

        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-semibold uppercase tracking-widest select-none">
              Or institutional password
            </span>
          </div>
        </div>

        {/* 3. Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Official Email / Institutional ID
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 bg-white shadow-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                placeholder="registrar@institution.edu.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 bg-white shadow-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full py-3 bg-[#0B3C88] hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-sm mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Button>

          {/* Registration Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            <span>Don't have an institutional account yet? </span>
            <Link to="/register" className="font-bold text-[#0B3C88] hover:underline">
              Register here &rarr;
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
