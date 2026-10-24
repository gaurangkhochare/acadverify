import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '../context/NotificationContext';
import { VerificationPage } from '../pages/VerificationPage';

describe('Verification Flow (Mockup 3)', () => {
  const renderVerification = () =>
    render(
      <BrowserRouter>
        <NotificationProvider>
          <VerificationPage />
        </NotificationProvider>
      </BrowserRouter>
    );

  it('renders verify input and disclaimer for basic checks', () => {
    renderVerification();
    expect(screen.getByText('Verify a student record')).toBeInTheDocument();
    expect(screen.getByLabelText('APAAR ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter the 12-digit APAAR ID')).toBeInTheDocument();
    expect(screen.getByText(/For employers, institutions and regulators/i)).toBeInTheDocument();
  });

  it('renders the verified record card matching Mockup 3', async () => {
    renderVerification();
    expect(screen.getByText('Record verified')).toBeInTheDocument();
    expect(screen.getByText('Asha K.')).toBeInTheDocument();
    expect(screen.getByText('Delhi Institute of Advanced Engineering & Technology')).toBeInTheDocument();
    expect(screen.getByText('B.Tech, Information Technology')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Currently enrolled')).toBeInTheDocument();
  });

  it('displays digital signature validity statement and privacy protection banner', () => {
    renderVerification();
    expect(screen.getByText(/Digital signature is valid/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You only see the details needed to verify this record/i)
    ).toBeInTheDocument();
  });
});

