import { render,fireEvent,waitFor,act} from '@testing-library/react';
import Login from '../components/Login/Login';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

declare const global: any;


describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login onLoginSuccess={() => {}} />);
  });
  test('allows user to input email and password', () => {
    const { getByLabelText } = render(<Login onLoginSuccess={() => {}} />);
    const emailInput = getByLabelText('email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits login form correctly', async () => {
    const mockResponse = { token: 'mockToken' };
    const response = {
      ok: true,
      json: async () => mockResponse,
    } as Response;
    
    fetchMock.mockResolvedValueOnce(response);
   
    const { getByLabelText, getByText } = render(
      <Login onLoginSuccess={() => {}} />
    );
    const emailInput = getByLabelText('email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('http://34.227.46.194:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test@example.com', password: 'password123' }),
      });
    });
});

test('handles login errors correctly', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false, statusText: 'Unauthorized' });

  const { getByLabelText, getByText } = render(<Login onLoginSuccess={() => {}} />);
  const emailInput = getByLabelText('email');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(loginButton);
});

});