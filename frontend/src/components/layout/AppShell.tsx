import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  User, 
  Code2, 
  HelpCircle, 
  LayoutDashboard, 
  UploadCloud, 
  Users, 
  AlertTriangle, 
  BarChart3, 
  Building2, 
  ClipboardList, 
  Settings, 
  Key, 
  CreditCard, 
  History, 
  GraduationCap, 
  FileCheck2, 
  Home, 
  Landmark, 
  LogIn,
  UserPlus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface AppShellProps {
  children: React.ReactNode;
}

interface NavItemConfig {
  label: string;
  sublabel?: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine top-left brand route
  const brandRoute = user
    ? user.role === 'INSTITUTION_ADMIN'
      ? '/institution/dashboard'
      : user.role === 'AICTE_ADMIN'
      ? '/aicte/dashboard'
      : user.role === 'STUDENT'
      ? '/student/portal'
      : user.role === 'VERIFIER'
      ? '/verify'
      : '/'
    : '/';

  // Dynamic role-based navigation configuration
  const getNavItems = (): NavItemConfig[] => {
    switch (user?.role) {
      case 'INSTITUTION_ADMIN':
        return [
          { label: 'Dashboard', path: '/institution/dashboard', icon: LayoutDashboard },
          { label: 'Bulk Import', sublabel: 'Upload Student Data', path: '/upload', icon: UploadCloud },
          { label: 'Student Roster', sublabel: 'Enrolment & APAAR IDs', path: '/students', icon: Users },
          { label: 'Compliance Alerts', sublabel: 'Data Issues & Review', path: '/issues', icon: AlertTriangle },
        ];
      case 'AICTE_ADMIN':
        return [
          { label: 'National Analytics', path: '/aicte/dashboard', icon: BarChart3 },
          { label: 'Institution Directory', path: '/reports', icon: Building2 },
          { label: 'Audit Logs', path: '/issues', icon: ClipboardList },
          { label: 'System Settings', path: '/help', icon: Settings },
        ];
      case 'VERIFIER':
        return [
          { label: 'Verification Dashboard', path: '/verify', icon: ShieldCheck },
          { label: 'API Keys', path: '/api-docs', icon: Key },
          { label: 'Billing', path: '/help', icon: CreditCard },
          { label: 'Lookup History', path: '/verify', icon: History },
        ];
      case 'STUDENT':
        return [
          { label: 'Academic Identity', path: '/student/portal', icon: GraduationCap },
          { label: 'Enrolment Status', path: '/student/portal', icon: FileCheck2 },
          { label: 'Discrepancy Report', path: '/help', icon: HelpCircle },
        ];
      default:
        return [
          { label: 'Home', path: '/', icon: Home, exact: true },
          { label: 'Authorized Verification', path: '/verify', icon: ShieldCheck },
          { label: 'Institutional Access', path: '/login?role=INSTITUTION_ADMIN', icon: Building2 },
          { label: 'Regulator Gateway', path: '/login?role=AICTE_ADMIN', icon: Landmark },
        ];
    }
  };

  const navItems = getNavItems();

  const getRoleDisplayName = (role?: string | null): string => {
    switch (role) {
      case 'INSTITUTION_ADMIN':
        return 'College Registrar';
      case 'AICTE_ADMIN':
        return 'AICTE Admin';
      case 'VERIFIER':
        return 'Authorized Verifier';
      case 'STUDENT':
        return 'Student Scholar';
      default:
        return 'Guest User';
    }
  };

  // Shared Sidebar Content supporting both Full Expanded and Mini Collapsed modes
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    const collapsed = !isMobile && isCollapsed;

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      collapsed
        ? `w-12 h-12 mx-auto flex items-center justify-center rounded-xl transition-all duration-150 group select-none relative ${
            isActive
              ? 'bg-white text-[#0B3C88] shadow-md font-bold'
              : 'text-blue-100 hover:bg-white/10 hover:text-white font-medium'
          }`
        : `flex items-center gap-3 px-3.5 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group select-none relative ${
            isActive
              ? 'bg-white text-[#0B3C88] shadow-sm font-bold'
              : 'text-blue-100 hover:bg-white/10 hover:text-white font-medium'
          }`;

    const utilityLinkClass = ({ isActive }: { isActive: boolean }) =>
      collapsed
        ? `w-10 h-10 mx-auto flex items-center justify-center rounded-lg text-xs font-semibold transition-colors select-none group relative ${
            isActive
              ? 'bg-white/20 text-white font-bold'
              : 'text-blue-200 hover:bg-white/10 hover:text-white font-medium'
          }`
        : `flex items-center gap-3 px-3.5 py-2 mx-1 rounded-lg text-xs font-semibold transition-colors select-none group relative ${
            isActive
              ? 'bg-white/20 text-white font-bold'
              : 'text-blue-200 hover:bg-white/10 hover:text-white font-medium'
          }`;

    const activeRoleText = user?.role === 'INSTITUTION_ADMIN'
      ? 'Institution'
      : user?.role === 'AICTE_ADMIN'
      ? 'Regulator'
      : user?.role === 'VERIFIER'
      ? 'Verifier'
      : user?.role === 'STUDENT'
      ? 'Student'
      : 'Public';

    return (
      <div className="flex flex-col h-full bg-[#0B3C88] text-white select-none">
        {/* 1. Main Platform Logo at Top of Sidebar */}
        <div className={`p-4 sm:p-5 border-b border-blue-900/60 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {collapsed ? (
            <NavLink
              to={brandRoute}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors relative group"
              title="AICTE National Academic Registry"
            >
              <ShieldCheck className="h-6 w-6 text-amber-300" />
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
                AICTE National Academic Registry
                <span className="text-[10px] text-blue-200 block font-normal">APAAR Student Data Portal</span>
              </div>
            </NavLink>
          ) : (
            <>
              <NavLink to={brandRoute} className="flex items-center gap-3 hover:opacity-95 transition-opacity min-w-0">
                <div className="p-2 bg-white/10 rounded-xl shrink-0">
                  <ShieldCheck className="h-6 w-6 text-amber-300" />
                </div>
                <div className="min-w-0 overflow-hidden">
                  <h1 className="text-xs sm:text-sm font-black tracking-tight text-white leading-tight truncate">
                    AICTE National Academic Registry
                  </h1>
                  <p className="text-xs font-medium text-white/90 tracking-wide truncate">
                    APAAR Student Data Portal
                  </p>
                </div>
              </NavLink>
              {/* Mobile close button */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Role Context Pill */}
        {collapsed ? (
          <div className="py-2 flex items-center justify-center bg-blue-950/40 border-b border-blue-900/40 relative group cursor-default">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300">
              {activeRoleText.slice(0, 3)}
            </span>
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
              Workspace: {activeRoleText} Portal
            </div>
          </div>
        ) : (
          <div className="px-4 py-2.5 bg-blue-950/40 border-b border-blue-900/40 flex items-center justify-between text-[11px]">
            <span className="text-blue-200 font-medium">Active Workspace</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-900/60 text-amber-300 font-semibold border border-blue-400/20">
              {activeRoleText}
            </span>
          </div>
        )}

        {/* 2. Dynamic, Role-Based Navigation Links */}
        <nav className="flex-1 py-4 px-2 sm:px-3 space-y-2 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {!collapsed && (
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-blue-300/80">
              Main Navigation
            </div>
          )}
          {navItems.map((item) => {
            const isAlertItem = item.path === '/issues' || item.label.toLowerCase().includes('alert');
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.exact}
                className={navLinkClass}
              >
                <div className="relative inline-flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 shrink-0" />
                  {isAlertItem && (
                    <span
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#0B3C88] animate-pulse pointer-events-none"
                      aria-label="New compliance alerts"
                    />
                  )}
                </div>
                {!collapsed && (
                  <div className="min-w-0">
                    <span className="truncate block leading-tight">{item.label}</span>
                    {item.sublabel && (
                      <span className="text-[10px] opacity-75 font-normal block truncate">
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip on hover when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
                    <span className="block leading-tight">{item.label}</span>
                    {item.sublabel && (
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. Global Utility Links Pinned to Absolute Bottom */}
        <div className="mt-auto p-2 sm:p-3 border-t border-blue-900/60 bg-blue-950/50 space-y-1.5 shrink-0">
          {!collapsed && (
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-blue-300/80">
              System & Support
            </div>
          )}
          <NavLink to="/api-docs" className={utilityLinkClass}>
            <Code2 className="w-5 h-5 shrink-0 text-blue-300" />
            {!collapsed && <span>API Docs</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
                API Docs
              </div>
            )}
          </NavLink>
          <NavLink to="/help" className={utilityLinkClass}>
            <HelpCircle className="w-5 h-5 shrink-0 text-blue-300" />
            {!collapsed && <span>Help</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
                Help & Knowledge Base
              </div>
            )}
          </NavLink>

          {/* 4. Desktop Sidebar Collapse / Expand Toggle Button */}
          {!isMobile && (
            <div className="pt-2 mt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`flex items-center ${
                  collapsed
                    ? 'w-10 h-10 mx-auto justify-center'
                    : 'w-full justify-between px-3 py-2'
                } rounded-xl text-xs font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-colors group relative cursor-pointer`}
                title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {!collapsed && (
                  <span className="text-xs text-blue-200 group-hover:text-white transition-colors">
                    Collapse Sidebar
                  </span>
                )}
                <div className="p-1 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-amber-300" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-amber-300" />
                  )}
                </div>

                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700">
                    Expand Sidebar
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-full flex h-screen overflow-hidden overflow-x-hidden bg-gray-50 text-slate-900 font-sans antialiased">
      {/* ========================================================
          1. FIXED VERTICAL SIDEBAR (DESKTOP) WITH COLLAPSIBLE MINI STATE
          ======================================================== */}
      <aside
        className={`hidden lg:flex lg:flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-[#0B3C88] flex-shrink-0 shrink-0 h-full z-30 shadow-xl border-r border-blue-950 transition-all duration-300 ease-in-out`}
      >
        <SidebarContent isMobile={false} />
      </aside>

      {/* ========================================================
          2. OFF-CANVAS MOBILE DRAWER (TABLET & MOBILE)
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />
          {/* Off-canvas panel (Always full w-64 on mobile) */}
          <div className="fixed inset-y-0 left-0 w-64 bg-[#0B3C88] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            <SidebarContent isMobile={true} />
          </div>
        </div>
      )}

      {/* ========================================================
          3. MAIN CONTENT AREA WITH SLIM TOP UTILITY HEADER
          ======================================================== */}
      <div className="flex-1 min-w-0 w-full max-w-full flex flex-col h-full bg-gray-50 overflow-y-auto overflow-x-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 ease-in-out">
        {/* Subtle Government of India National Tricolor Strip */}
        <div className="h-1 w-full grid grid-cols-3 shrink-0">
          <div className="bg-[#FF9933]" />
          <div className="bg-white" />
          <div className="bg-[#138808]" />
        </div>

        {/* Universal Slim White Top Header (h-16, border-b border-gray-200) */}
        <header className="h-16 w-full bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs shrink-0">
          {/* Left Side: Mobile Hamburger & Context */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B3C88]"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                AICTE Academic Registry
              </span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-[#0B3C88]">
                {user?.role === 'INSTITUTION_ADMIN'
                  ? 'Institution Portal'
                  : user?.role === 'AICTE_ADMIN'
                  ? 'National Bureau'
                  : user?.role === 'VERIFIER'
                  ? 'Verification Portal'
                  : user?.role === 'STUDENT'
                  ? 'Student Portal'
                  : 'Public Portal'}
              </span>
            </div>
          </div>

          {/* Right Side: User Session / Circular Avatar / Logout */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Circular Avatar + Name + Specific Role */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0B3C88] border border-blue-200 font-bold flex items-center justify-center shrink-0 text-sm shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-semibold text-slate-900 truncate max-w-[170px] leading-tight">
                      {user.name.split('(')[0].trim()}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      {getRoleDisplayName(user.role)}
                    </p>
                  </div>
                </div>

                {/* Clean Logout Icon */}
                <button
                  type="button"
                  onClick={logout}
                  title="Sign out of account"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#0B3C88] hover:bg-blue-50 border border-blue-200 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0B3C88] hover:bg-[#072B62] shadow-xs transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 w-full max-w-full min-w-0 relative overflow-x-hidden">
          {children}
        </main>

        {/* Global Slim Regulatory Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 text-center text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © {new Date().getFullYear()} All India Council for Technical Education (AICTE), Ministry of Education, Govt. of India.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <NavLink to="/api-docs" className="hover:text-[#0B3C88] hover:underline">
                API Docs
              </NavLink>
              <NavLink to="/help" className="hover:text-[#0B3C88] hover:underline">
                Helpdesk & FAQs
              </NavLink>
              <NavLink to="/verify" className="hover:text-[#0B3C88] hover:underline">
                Verification Gateway
              </NavLink>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
