import { render, screen,act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailList from '../components/EmailList/EmailList';
import axios from 'axios';
//import userEvent from '@testing-library/user-event';

jest.mock('axios'); // Mock axios for controlled testing

describe('EmailList', () => {
  it('renders empty list message when no emails are present', () => {
    render(<EmailList typeEmail={''} />);
    const emptyListMessage = screen.queryByText(/This is your email list, but it's empty./i);
    expect(emptyListMessage).toBeInTheDocument(); // Si no se encuentra, será `null`
  });
  
  it('handles errors during email fetching', async () => {
    const error = new Error('Failed to fetch emails');
  
    const mockedAxios = jest.mocked(axios);
    mockedAxios.get.mockRejectedValueOnce(error);
  
    console.error = jest.fn(); // Mock console.error for testing purposes
  
    const { getByText } = render(<EmailList typeEmail={''} />);
  
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async operations
    });
  
    expect(getByText(/This is your email list, but it's empty./i)).toBeInTheDocument();
  });
   
});