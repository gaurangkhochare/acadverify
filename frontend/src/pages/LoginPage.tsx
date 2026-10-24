import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { ShieldCheck, ArrowRight, Lock, Mail, Building, Landmark, UserCheck } from 'lucide-react';
import { UserRole } from '../types/auth';
import { useNotification } from '../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [email, setEmail] = useState<string>('registrar@diaet.edu.in');
  const [password, setPassword] = useState<string>('••••••••');
  const [role, setRole] = useState<UserRole>('INSTITUTION_ADMIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await login({ email, password, role });
      notify('success', 'Authentication successful', `Signed in as ${user.name}`);
      if (user.role === 'AICTE_ADMIN') {
        navigate('/aicte/dashboard');
      } else if (user.role === 'VERIFIER') {
        navigate('/verify');
      } else {
        navigate('/');
      }
    } catch {
      notify('error', 'Login failed', 'Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchRole(targetRole);
    notify('info', `Switched role to ${targetRole}`);
    if (targetRole === 'AICTE_ADMIN') {
      navigate('/aicte/dashboard');
    } else if (targetRole === 'VERIFIER') {
      navigate('/verify');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-900 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0B3C88] text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sign In to APAAR Portal
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            AICTE Regulatory Data Platform
          </p>
        </div>

        {/* Quick Demo Switchers */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-600 block text-center">
            Quick 1-Click Demo Profiles:
          </span>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('INSTITUTION_ADMIN')}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/50 transition-all text-left text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 text-[#0B3C88]" />
                <div>
                  <p className="font-bold text-slate-900">Institution Administrator</p>
                  <p className="text-slate-500 text-[11px]">Delhi Institute of Advanced Eng & Tech</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('AICTE_ADMIN')}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/50 transition-all text-left text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Landmark className="w-4 h-4 text-[#0B3C88]" />
                <div>
                  <p className="font-bold text-slate-900">AICTE Regulator Admin</p>
                  <p className="text-slate-500 text-[11px]">Regulation Bureau National Overview</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('VERIFIER')}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-300 hover:border-[#0B3C88] hover:bg-blue-50/50 transition-all text-left text-xs"
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#0B3C88]" />
                <div>
                  <p className="font-bold text-slate-900">Authorized Academic Verifier</p>
                  <p className="text-slate-500 text-[11px]">Background Verification Portal</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-slate-500 font-semibold">Or enter credentials</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Email / Academic ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B3C88]"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full py-3 bg-[#0B3C88] text-base font-bold shadow-sm mt-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

