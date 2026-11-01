import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GovtHeader } from '../common/GovtHeader';
import { 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const dashboardRoute = user
    ? user.role === 'INSTITUTION_ADMIN'
      ? '/institution/dashboard'
      : user.role === 'AICTE_ADMIN'
      ? '/aicte/dashboard'
      : user.role === 'STUDENT'
      ? '/student/portal'
      : '/verify'
    : '/institution/dashboard';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs sm:text-sm font-semibold transition-all duration-150 select-none inline-flex items-center py-1 relative ${
      isActive
        ? 'text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400 after:rounded-full'
        : 'text-blue-100/90 hover:text-gray-200 hover:opacity-90'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans antialiased w-full">
      {/* 1. Official Republic of India & GIGW 3.0 Accessibility Top Bar */}
      <GovtHeader />

      {/* 2. Standardized Clean Horizontal Top Navigation Bar */}
      <header className="bg-[#0B3C88] text-white shadow-md sticky top-0 z-40 border-b border-blue-950 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Far Left: Official Platform Logo ("AICTE National Academic Registry") */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
              <div className="p-2 bg-white/10 rounded-xl shrink-0">
                <ShieldCheck className="h-7 w-7 text-amber-300" />
              </div>
              <div>
                <span className="text-base sm:text-xl font-black tracking-tight text-white leading-tight block">
                  AICTE National Academic Registry
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/90 tracking-wide block">
                  APAAR Student Data Portal
                </span>
              </div>
            </NavLink>

            {/* Far Right: Public Links (Home, API Docs, Help) & Auth Action Buttons */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Main Navigation Links with generous breathing room */}
              <nav className="flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/api-docs" className={navLinkClass}>
                  API Docs
                </NavLink>
                <NavLink to="/help" className={navLinkClass}>
                  Help
                </NavLink>
              </nav>

              {/* Call-to-Action Buttons */}
              {user ? (
                <div className="flex items-center gap-3 pl-6 border-l border-white/20">
                  <NavLink
                    to={dashboardRoute}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 transition-all duration-150 shadow-xs border border-amber-300/50"
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span className="leading-none">Dashboard</span>
                  </NavLink>

                  <div className="flex items-center gap-2 bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-400/30">
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white text-xs truncate max-w-[120px] leading-tight">
                        {user.name.split('(')[0].trim()}
                      </p>
                      <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                        {user.role === 'INSTITUTION_ADMIN' ? 'Registrar' : user.role === 'STUDENT' ? 'Student' : user.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    title="Sign out"
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-6 border-l border-white/20">
                  <NavLink
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 transition-all duration-150 shadow-xs border border-amber-400/50"
                  >
                    <LogIn className="w-4 h-4 shrink-0" />
                    <span className="leading-none">Sign In</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 transition-all duration-150 shadow-xs"
                  >
                    <UserPlus className="w-4 h-4 shrink-0 text-amber-300" />
                    <span className="leading-none">Register</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-900/60 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-100 hover:bg-white/10"
              >
                Home
              </NavLink>
              <NavLink
                to="/api-docs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-100 hover:bg-white/10"
              >
                API Docs
              </NavLink>
              <NavLink
                to="/help"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-100 hover:bg-white/10"
              >
                Help
              </NavLink>

              {user ? (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <NavLink
                    to={dashboardRoute}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-amber-400 text-slate-950"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-white/80 hover:text-white p-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs border border-amber-400/50"
                  >
                    <LogIn className="w-4 h-4 shrink-0" />
                    <span className="leading-none">Sign In</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/25 shadow-xs"
                  >
                    <UserPlus className="w-4 h-4 shrink-0 text-amber-300" />
                    <span className="leading-none">Register</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* 3. Main Full-Width Content Container */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* 4. Official Government Footer */}
      <footer className="bg-[#0e1726] text-slate-400 text-xs border-t-2 border-[#0B3C88] w-full">
        <div className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]" />
          <div className="bg-white" />
          <div className="bg-[#138808]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Organization */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>AICTE Regulation Bureau</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                All India Council for Technical Education (AICTE), Ministry of Education, Government of India. 
                Authoritative platform for APAAR ID-based student verification and intake monitoring.
              </p>
              <div className="text-[11px] text-slate-400">
                Nelson Mandela Marg, Vasant Kunj, New Delhi-110070
              </div>
            </div>

            {/* Column 2: Digital India & NEP 2020 Links */}
            <div className="space-y-2">
              <span className="text-white font-bold text-xs uppercase tracking-wider block">
                National Initiatives
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <a href="https://www.education.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Ministry of Education</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.aicte-india.org" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>AICTE Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.abc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Academic Bank of Credits (ABC)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>DigiLocker National Registry</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Portals */}
            <div className="space-y-2">
              <span className="text-white font-bold text-xs uppercase tracking-wider block">
                Platform Portals
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <NavLink to="/institution/dashboard" className="hover:text-white">
                    Institution Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aicte/dashboard" className="hover:text-white">
                    AICTE National Bureau Radar
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/student/portal" className="hover:text-white">
                    Student Academic Identity Portal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/verify" className="hover:text-white">
                    Authorized Verification Gateway
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/api-docs" className="hover:text-white">
                    Developer REST API & ERP SDK
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Column 4: Helpdesk */}
            <div className="space-y-2">
              <span className="text-white font-bold text-xs uppercase tracking-wider block">
                Regulatory Helpdesk
              </span>
              <div className="space-y-1.5 text-[11px]">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Toll Free: 1800-11-2563 (9 AM - 6 PM)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>helpdesk.apaar@aicte-india.org</span>
                </p>
                <div className="pt-2 text-[10px] text-slate-400">
                  SIH 2026 Problem Statement 26263 • Smart Automation Theme
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
            <div>
              &copy; {new Date().getFullYear()} All India Council for Technical Education (AICTE). All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Website Guidelines: GIGW 3.0</span>
              <span>•</span>
              <span>Security Audited by CERT-In Baseline</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
