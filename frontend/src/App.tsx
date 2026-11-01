import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppShell } from './components/layout/AppShell';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { AicteDashboardPage } from './pages/AicteDashboardPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { BulkUploadPage } from './pages/BulkUploadPage';
import { VerificationPage } from './pages/VerificationPage';
import { StudentListPage } from './pages/StudentListPage';
import { IssueListPage } from './pages/IssueListPage';
import { ReportsPage } from './pages/ReportsPage';
import { HelpPage } from './pages/HelpPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ApiDocsPage } from './pages/ApiDocsPage';

// Smooth Client-Side Scroll To Top & Anchor Target Resolver
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();

  // Distinguish public-facing full-width pages (Home, API Docs, Help, Login, Register) from authenticated dashboard workflows
  const isPublicRoute = 
    location.pathname === '/' || 
    location.pathname === '/login' || 
    location.pathname === '/register' ||
    location.pathname === '/api-docs' ||
    location.pathname === '/developers' ||
    location.pathname === '/help';

  const LayoutWrapper = isPublicRoute ? PublicLayout : AppShell;

  return (
    <LayoutWrapper>
      <ScrollToTop />
      {/* Animated Client-Side Page Transition Wrapper */}
      <div key={location.pathname} className="animate-page-enter w-full max-w-full min-w-0">
        <Routes location={location}>
          {/* Public Full-Width Landing Interface */}
          <Route path="/" element={<HomePage />} />

          {/* 4 Dedicated Stakeholder Interfaces */}
          <Route path="/institution/dashboard" element={<InstitutionDashboardPage />} />
          <Route path="/aicte/dashboard" element={<AicteDashboardPage />} />
          <Route path="/student/portal" element={<StudentPortalPage />} />
          <Route path="/verify" element={<VerificationPage />} />

          {/* Operational Institution Flows */}
          <Route path="/upload" element={<BulkUploadPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/issues" element={<IssueListPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Developer & Interoperability Portal (SIH Requirement #7) */}
          <Route path="/api-docs" element={<ApiDocsPage />} />
          <Route path="/developers" element={<ApiDocsPage />} />

          {/* Authentication & Onboarding */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </LayoutWrapper>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
