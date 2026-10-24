import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import { BulkUploadPage } from '../pages/BulkUploadPage';

describe('Bulk Upload Flow (Mockup 2)', () => {
  const renderUpload = () =>
    render(
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <BulkUploadPage />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    );

  it('renders the multi-step stepper with active check data step', () => {
    renderUpload();
    expect(screen.getByText('Choose file')).toBeInTheDocument();
    expect(screen.getByText('Check data')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders file checked banner with row count', () => {
    renderUpload();
    expect(screen.getByText(/File checked:/i)).toBeInTheDocument();
    expect(screen.getByText('students_2026.csv')).toBeInTheDocument();
  });

  it('displays the ready to submit count and needs fixing count cards', () => {
    renderUpload();
    expect(screen.getByText('242')).toBeInTheDocument();
    expect(screen.getByText('rows are ready to submit')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('rows need fixing first')).toBeInTheDocument();
  });

  it('renders the "Rows to fix" table with detailed errors', () => {
    renderUpload();
    expect(screen.getByText('Rows to fix')).toBeInTheDocument();
    expect(screen.getByText('Asha K.')).toBeInTheDocument();
    expect(screen.getByText('APAAR ID has 11 digits')).toBeInTheDocument();
    expect(screen.getByText('Enter all 12 digits')).toBeInTheDocument();
    expect(screen.getByText('Ravi M.')).toBeInTheDocument();
    expect(screen.getByText('Same ID appears twice')).toBeInTheDocument();
    expect(screen.getByText('Neha S.')).toBeInTheDocument();
    expect(screen.getByText('Seat category is empty')).toBeInTheDocument();
    expect(screen.getByText('Imran A.')).toBeInTheDocument();
    expect(screen.getByText('Admission would exceed intake')).toBeInTheDocument();
  });

  it('renders the consent checkbox and submission button', () => {
    renderUpload();
    const consent = screen.getByLabelText(/Students have consented to sharing this data with AICTE/i);
    expect(consent).toBeInTheDocument();
    expect(consent).toBeChecked();

    const submitBtn = screen.getByText('Submit 242 ready records');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
  });
});

