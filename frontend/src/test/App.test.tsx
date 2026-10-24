import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Shell & Role Navigation', () => {
  it('renders top navbar brand and navigation links matching mockup', () => {
    render(<App />);
    expect(screen.getByText('APAAR Student Data Portal')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Upload/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Verify/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Help').length).toBeGreaterThan(0);
  });
});

