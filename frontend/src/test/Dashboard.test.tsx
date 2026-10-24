import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import { InstitutionDashboardPage } from '../pages/InstitutionDashboardPage';

describe('Institution Dashboard Page (Mockup 1)', () => {
  const renderDashboard = () =>
    render(
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <InstitutionDashboardPage />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    );

  it('renders welcome message and sample data badge', async () => {
    renderDashboard();
    expect(await screen.findByText(/Welcome,/i)).toBeInTheDocument();
    expect(screen.getByText('Sample data')).toBeInTheDocument();
  });

  it('renders primary quick action buttons', async () => {
    renderDashboard();
    expect(screen.getByText('Upload student data')).toBeInTheDocument();
    expect(screen.getByText('Verify a student record')).toBeInTheDocument();
  });

  it('renders metric cards matching Mockup 1 values', async () => {
    renderDashboard();
    expect(await screen.findByText('Approved intake')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('Students enrolled')).toBeInTheDocument();
    expect(screen.getByText('118')).toBeInTheDocument();
    expect(screen.getByText('Records verified')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
    expect(screen.getByText('Need your attention')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('renders intake progress text and remaining seats caption', async () => {
    renderDashboard();
    expect(await screen.findByText('118 of 120 approved seats are filled')).toBeInTheDocument();
    expect(screen.getByText(/2 seats remaining/i)).toBeInTheDocument();
  });

  it('renders the "What needs fixing" action items with action buttons', async () => {
    renderDashboard();
    expect(await screen.findByText('What needs fixing')).toBeInTheDocument();
    expect(screen.getByText('3 records have no APAAR ID')).toBeInTheDocument();
    expect(screen.getByText('2 students may be enrolled at another institution too')).toBeInTheDocument();
    expect(screen.getByText('1 record is missing its seat category')).toBeInTheDocument();
    expect(screen.getAllByText('Fix now').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Review')).toBeInTheDocument();
  });
});

