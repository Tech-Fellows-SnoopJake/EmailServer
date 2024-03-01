import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ComposeEmail from '../components/ComposeEmail/ComposeEmail';

jest.mock('axios'); // Mock the axios library

jest.mock('react-quill/dist/quill.snow.css');
  
describe('ComposeEmail', () => {
  test('should render the ComposeEmail component', () => {
    render(<ComposeEmail />);
    expect(true).toBeTruthy();
  });

  test('Updaptes inputs fields', () => {
    const { getByPlaceholderText } = render(<ComposeEmail />);
    const toInput = getByPlaceholderText('To') as HTMLInputElement;
    fireEvent.change(toInput, { target: { value: 'example@example.com' } });
    expect(toInput.value).toBe('');
    // check recipient input
    const subjectInput = getByPlaceholderText('Subject') as HTMLInputElement;
    fireEvent.change(subjectInput, { target: { value: 'Test email' } });
    expect(subjectInput.value).toBe('Test email');
    //check subject input
    const bodyInput = getByPlaceholderText('Body') as HTMLInputElement;
    fireEvent.change(bodyInput, { target: { value: 'This is a test email' } });
    expect(bodyInput.value).toBe('This is a test email');
  });
  test('submits form and handles response', async () => {
    jest.spyOn(axios,"post").mockResolvedValueOnce({ status: 200, data: { message: 'Email sent successfully!' } });
    const { getByText, getByPlaceholderText } = render(<ComposeEmail />);
    const toInput = getByPlaceholderText('To');
    const subjectInput = getByPlaceholderText('Subject');
    const sendButton = getByText('Send');

    fireEvent.change(toInput, { target: { value: 'example@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        receiver: 'example@example.com',
        subject: 'Test Subject',
        body: '',
        sender: 'julian@snoopjake.com',
        user: 3
      });
      // Verificar que se llame a la función handleSubmit con los datos del formulario
      // Verificar que se muestre el mensaje de éxito adecuado
    });
  });
});


    

