import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  LogOut, 
  User, 
  LogIn, 
  ChevronDown, 
  Building, 
  Landmark, 
  UserCheck, 
  GraduationCap,
  UserPlus
} from 'lucide-react';
import { GovtHeader } from './GovtHeader';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Active indicator layout animation measurements
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Check if current route is a public auth/registration page
  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';
  const isPublicAuthPage = isRegisterPage || isLoginPage;

  // Primary route for top-left brand logo: routes back to dashboard when logged in
  const logoRoute = user
    ? user.role === 'INSTITUTION_ADMIN'
      ? '/institution/dashboard'
      : user.role === 'AICTE_ADMIN'
      ? '/aicte/dashboard'
      : user.role === 'STUDENT'
      ? '/student/portal'
      : '/'
    : '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSignInOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update gliding active indicator position on route transition or resize
  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeLink = navRef.current.querySelector('a.nav-link-active') as HTMLElement | null;
      if (activeLink) {
        setIndicatorStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // RAF ensures accurate bounding box after DOM layout computation
    const frame = requestAnimationFrame(() => {
      updateIndicator();
    });
    window.addEventListener('resize', updateIndicator);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname, user?.role]);

  // Clean navigation links with smooth gliding active text transition
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `relative z-10 font-bold px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-colors duration-200 select-none ${
      isActive
        ? 'nav-link-active text-[#0B3C88]'
        : 'text-white/85 hover:text-white hover:bg-white/10'
    }`;

  return (
    <>
      {/* 1. Official Government Header Strip (GIGW Compliant) */}
      <GovtHeader />

      {/* 2. Primary Portal Navbar */}
      <header className="bg-[#0B3C88] text-white shadow-md sticky top-0 z-40 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Brand - Primary route back to dashboard when authenticated */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <ShieldCheck className="h-7 w-7 text-amber-300" />
              </div>
              <div>
                <NavLink 
                  to={logoRoute} 
                  className="text-xl sm:text-2xl font-black tracking-tight text-white hover:opacity-95"
                >
                  APAAR Student Data Portal
                </NavLink>
                <div className="text-[10px] tracking-wider uppercase text-blue-200 font-semibold">
                  AICTE Regulatory Compliance & Verification
                </div>
              </div>
            </div>

            {/* Center Navigation - Context-aware with Gliding Active Pill */}
            <nav 
              ref={navRef} 
              className="hidden md:flex items-center space-x-1 relative p-1 rounded-xl bg-blue-950/40 border border-blue-400/20 backdrop-blur-sm shadow-inner"
            >
              {/* Smooth Gliding Active Pill */}
              {indicatorStyle.opacity > 0 && (
                <div
                  className="absolute top-1 bottom-1 rounded-lg bg-white shadow-md pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateX(${indicatorStyle.left}px)`,
                    width: `${indicatorStyle.width}px`,
                  }}
                >
                  {/* Subtle amber accent bar under active link */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-amber-400 rounded-full" />
                </div>
              )}

              {/* Only show 'Home' link for public/unauthenticated visitors */}
              {(!user || isPublicAuthPage) && (
                <NavLink to="/" className={navItemClass} end>
                  Home
                </NavLink>
              )}

              {/* Internal links only when authenticated AND NOT on public auth pages */}
              {!isPublicAuthPage && user?.role === 'INSTITUTION_ADMIN' && (
                <>
                  <NavLink to="/institution/dashboard" className={navItemClass}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/upload" className={navItemClass}>
                    Upload students
                  </NavLink>
                  <NavLink to="/students" className={navItemClass}>
                    Students
                  </NavLink>
                  <NavLink to="/issues" className={navItemClass}>
                    Issues
                  </NavLink>
                </>
              )}

              {!isPublicAuthPage && user?.role === 'AICTE_ADMIN' && (
                <>
                  <NavLink to="/aicte/dashboard" className={navItemClass}>
                    National Dashboard
                  </NavLink>
                  <NavLink to="/reports" className={navItemClass}>
                    Reports
                  </NavLink>
                </>
              )}

              {!isPublicAuthPage && user?.role === 'STUDENT' && (
                <NavLink to="/student/portal" className={navItemClass}>
                  My Student Portal
                </NavLink>
              )}

              {/* Public Common Links */}
              <NavLink to="/api-docs" className={navItemClass}>
                API Docs
              </NavLink>
              <NavLink to="/help" className={navItemClass}>
                Help
              </NavLink>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* If on Register Page: Clean Sign In CTA (no logged in user profile or logout button) */}
              {isRegisterPage ? (
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 transition-all shadow-xs border border-amber-300/50"
                >
                  <LogIn className="h-4 w-4 shrink-0 text-slate-950" />
                  <span className="leading-none">Sign In</span>
                </button>
              ) : isLoginPage ? (
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 transition-all shadow-xs"
                >
                  <UserPlus className="h-4 w-4 shrink-0 text-amber-300" />
                  <span className="leading-none">Register</span>
                </button>
              ) : user ? (
                /* Authenticated User Status on regular application pages */
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-400/30">
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white text-xs truncate max-w-[140px] leading-tight">
                        {user.name.split('(')[0].trim()}
                      </p>
                      <p className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                        {user.role === 'INSTITUTION_ADMIN' ? 'College Registrar' : user.role === 'STUDENT' ? 'Student' : user.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <button
                    onClick={logout}
                    title="Sign out of account"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors border border-white/30"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                /* Unauthenticated Visitor: Consolidated Universal Sign In Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsSignInOpen(!isSignInOpen)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 transition-all shadow-xs border border-amber-300/50"
                  >
                    <LogIn className="h-4 w-4 shrink-0 text-slate-950" />
                    <span className="leading-none">Sign In</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 ${isSignInOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSignInOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-slate-900 py-2 z-50 text-slate-900 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Select Stakeholder Portal
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            navigate('/login?role=INSTITUTION_ADMIN');
                            setIsSignInOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-blue-50/80 flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0B3C88] flex items-center justify-center shrink-0">
                            <Building className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900 group-hover:text-[#0B3C88]">
                              Institution Login
                            </p>
                            <p className="text-[10px] text-slate-500">Colleges & Nodal Officers</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            navigate('/login?role=VERIFIER');
                            setIsSignInOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-blue-50/80 flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900 group-hover:text-[#0B3C88]">
                              Authorized Verifier
                            </p>
                            <p className="text-[10px] text-slate-500">Corporate HR & Screening</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            navigate('/login?role=AICTE_ADMIN');
                            setIsSignInOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-blue-50/80 flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                            <Landmark className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900 group-hover:text-[#0B3C88]">
                              AICTE Regulator
                            </p>
                            <p className="text-[10px] text-slate-500">National Regulatory Bureau</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            navigate('/login?role=STUDENT');
                            setIsSignInOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-blue-50/80 flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900 group-hover:text-[#0B3C88]">
                              Student Portal
                            </p>
                            <p className="text-[10px] text-slate-500">APAAR Academic Card & ABC</p>
                          </div>
                        </button>
                      </div>

                      <div className="px-4 py-2.5 bg-slate-50 text-[11px] flex items-center justify-between">
                        <span className="text-slate-500">New institution?</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigate('/register');
                            setIsSignInOpen(false);
                          }}
                          className="font-bold text-[#0B3C88] hover:underline"
                        >
                          Register Portal &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Bar */}
          <div className="flex md:hidden pb-3 pt-1 space-x-2 overflow-x-auto">
            {(!user || isPublicAuthPage) && (
              <NavLink to="/" className={navItemClass} end>
                Home
              </NavLink>
            )}
            {!isPublicAuthPage && user?.role === 'INSTITUTION_ADMIN' && (
              <>
                <NavLink to="/institution/dashboard" className={navItemClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/upload" className={navItemClass}>
                  Upload
                </NavLink>
                <NavLink to="/students" className={navItemClass}>
                  Students
                </NavLink>
              </>
            )}
            {!isPublicAuthPage && user?.role === 'AICTE_ADMIN' && (
              <NavLink to="/aicte/dashboard" className={navItemClass}>
                AICTE
              </NavLink>
            )}
            {!isPublicAuthPage && user?.role === 'STUDENT' && (
              <NavLink to="/student/portal" className={navItemClass}>
                Student Portal
              </NavLink>
            )}
            <NavLink to="/api-docs" className={navItemClass}>
              API Docs
            </NavLink>
            <NavLink to="/help" className={navItemClass}>
              Help
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};
