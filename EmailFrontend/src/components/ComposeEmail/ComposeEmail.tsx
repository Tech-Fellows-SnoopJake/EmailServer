import React, { useState } from 'react';
import './ComposeEmail.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';

function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'The request was invalid. Please check your input. CLICK HERE TO DISMISS THIS MESSAGE';
    case 401:
      return 'You are not authorized to send this email. CLICK HERE TO DISMISS THIS MESSAGE';
    case 403:
      return 'Access is forbidden. Please check your permissions. CLICK HERE TO DISMISS THIS MESSAGE';
    case 404:
      return 'The email service was not found. CLICK HERE TO DISMISS THIS MESSAGE';
    case 500:
      return 'An internal server error occurred. Please try again later. CLICK HERE TO DISMISS THIS MESSAGE';
    default:
      return 'An unknown error occurred. Please try again. CLICK HERE TO DISMISS THIS MESSAGE';
  }
}


const ComposeEmail: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  // Utility function to show message and fade it out after 5 seconds
  const showMessage = (text: string, type: 'error' | 'success') => {
    setMessage({ text, type });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const apiUrl = 'https://temporal_api/send-email'; // 
    const emailData = { to, subject, body };

    try {
      const response = await axios.post(apiUrl, emailData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE', 
        },
      });

      // Check for non-2xx status codes
      if (response.status === 200) {
        showMessage('Email sent successfully!', 'success');
        // Reset form fields
        setTo('');
        setSubject('');
        setBody('');
      } else {
        showMessage(getErrorMessage(response.status), 'error');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If error has a response property, it's an HTTP error
        showMessage(getErrorMessage(error.response.status), 'error');
      } else {
        // Otherwise, it's a network error or other issue
        showMessage('A network error occurred... It\'s either our server or your internet! Please try again later or check your internet connection.', 'error');
      }
    }
  };

  return (
    <div className="compose-email">
      {message && (
        <div className={`message ${message.type}`} onClick={() => setMessage(null)}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <ReactQuill
          value={body}
          onChange={setBody}
          placeholder="Body"
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, {'list': 'bullet' }],
              ['clean']
            ]
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ComposeEmail;