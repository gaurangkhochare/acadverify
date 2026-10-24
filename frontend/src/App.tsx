import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { AicteDashboardPage } from './pages/AicteDashboardPage';
import { BulkUploadPage } from './pages/BulkUploadPage';
import { VerificationPage } from './pages/VerificationPage';
import { StudentListPage } from './pages/StudentListPage';
import { IssueListPage } from './pages/IssueListPage';
import { ReportsPage } from './pages/ReportsPage';
import { HelpPage } from './pages/HelpPage';
import { LoginPage } from './pages/LoginPage';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<InstitutionDashboardPage />} />
          <Route path="/aicte/dashboard" element={<AicteDashboardPage />} />
          <Route path="/upload" element={<BulkUploadPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/issues" element={<IssueListPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AICTE SIH Problem Statement 26263 — Regulation Bureau — Smart Automation</span>
          <span className="font-semibold text-slate-700">Authoritative APAAR Data Management & Verification</span>
        </div>
      </footer>
    </div>
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

