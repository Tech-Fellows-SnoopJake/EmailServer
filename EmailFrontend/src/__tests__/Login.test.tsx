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
    const passwordInput = getByLabelText('password') as HTMLInputElement;
    

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'brHTAITnNdYmIyJ' } });
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('brHTAITnNdYmIyJ');
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
    const loginButton = getByText('Login');
    const passwordInput = getByLabelText('password');


    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'brHTAITnNdYmIyJ' } });
    fireEvent.click(loginButton);
//TODO: fix IP
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('http://18.119.121.232:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test@example.com', password: 'brHTAITnNdYmIyJ' }),
      });
    });
});

test('handles login errors correctly', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false, statusText: 'Unauthorized' });

  const { getByLabelText, getByText } = render(<Login onLoginSuccess={() => {}} />);
  const emailInput = getByLabelText('email');
  const loginButton = getByText('Login');
  const passwrordInput = getByLabelText('password');
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwrordInput, { target: { value: 'brHTAITnNdYmIyJ' } });
  fireEvent.click(loginButton);
});

});