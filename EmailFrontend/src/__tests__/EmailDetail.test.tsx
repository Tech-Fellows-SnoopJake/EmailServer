import { render, screen } from '@testing-library/react';
import EmailDetail  from '../components/EmailDetail/EmailDetail'; // Adjust path as needed
import '@testing-library/jest-dom';


// Mock `useLocation` hook:
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({}),
}));

describe('EmailDetail component', () => {
  it('renders "Email not found" message when no email data is provided', () => {
    render(<EmailDetail />);
    expect(screen.getByText('Email not found.')).toBeInTheDocument();
  });
  
}); 