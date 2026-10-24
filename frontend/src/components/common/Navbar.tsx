import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { ShieldCheck, LogOut, UserCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    switchRole(newRole);
    if (newRole === 'AICTE_ADMIN') {
      navigate('/aicte/dashboard');
    } else if (newRole === 'INSTITUTION_ADMIN') {
      navigate('/');
    } else if (newRole === 'VERIFIER') {
      navigate('/verify');
    }
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-white text-[#0B3C88] font-bold px-4 py-2 rounded-lg shadow-sm text-sm sm:text-base transition-colors'
      : 'text-white border border-white/60 hover:bg-white/10 font-medium px-4 py-2 rounded-lg text-sm sm:text-base transition-colors';

  return (
    <header className="bg-[#0B3C88] text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <ShieldCheck className="h-7 w-7 text-amber-300" />
            </div>
            <div>
              <NavLink to="/" className="text-xl sm:text-2xl font-black tracking-tight text-white hover:opacity-95">
                APAAR Student Data Portal
              </NavLink>
              <div className="text-[10px] tracking-wider uppercase text-blue-200 font-semibold">
                AICTE Regulatory Compliance & Verification
              </div>
            </div>
          </div>

          {/* Center Navigation - matching mockups exactly */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navItemClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/upload" className={navItemClass}>
              Upload students
            </NavLink>
            <NavLink to="/verify" className={navItemClass}>
              Verify a record
            </NavLink>
            <NavLink to="/help" className={navItemClass}>
              Help
            </NavLink>
          </nav>

          {/* Right User & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Role Selector */}
            <div className="hidden lg:flex items-center gap-1.5 bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-400/40 text-xs">
              <UserCircle className="h-4 w-4 text-blue-200" />
              <label htmlFor="role-select" className="text-blue-200 font-medium sr-only">
                Role:
              </label>
              <select
                id="role-select"
                value={user?.role || 'INSTITUTION_ADMIN'}
                onChange={handleRoleChange}
                className="bg-transparent text-white font-semibold cursor-pointer focus:outline-none"
              >
                <option value="INSTITUTION_ADMIN" className="text-slate-900">
                  Institution Admin
                </option>
                <option value="AICTE_ADMIN" className="text-slate-900">
                  AICTE Admin (Regulator)
                </option>
                <option value="VERIFIER" className="text-slate-900">
                  Authorized Verifier
                </option>
              </select>
            </div>

            {/* Logout button */}
            {user && (
              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden pb-3 pt-1 space-x-2 overflow-x-auto">
          <NavLink to="/" className={navItemClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/upload" className={navItemClass}>
            Upload
          </NavLink>
          <NavLink to="/verify" className={navItemClass}>
            Verify
          </NavLink>
          <NavLink to="/students" className={navItemClass}>
            Students
          </NavLink>
          <NavLink to="/issues" className={navItemClass}>
            Issues
          </NavLink>
          <NavLink to="/help" className={navItemClass}>
            Help
          </NavLink>
        </div>
      </div>
    </header>
  );
};

