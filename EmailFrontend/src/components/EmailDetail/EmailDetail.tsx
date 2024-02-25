import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmailDetail.css';

const EmailDetail = () => {
  const location = useLocation();
  const email = location.state?.email; // Access the passed email data

  if (!email) {
    return <div className="email-detail-frame">Email not found.</div>;
  }

  return (
    <div className="email-detail-frame">
      <h2>{email.subject}</h2>
      <p><strong>From:</strong> {email.sender}</p>
      <p><strong>Date:</strong> {email.date}</p>
      <div className="email-body">{email.body}</div>
    </div>
  );
};

export default EmailDetail;
