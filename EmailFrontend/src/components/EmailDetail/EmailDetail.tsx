import React from 'react';
import './EmailDetail.css'

const EmailDetail: React.FC = () => {
  return (
    <div className="email-detail">
      <h2>Email Subject</h2>
      <p><strong>From:</strong> sender@example.com</p>
      <p><strong>To:</strong> recipient@example.com</p>
      <p><strong>Date:</strong> Date and Time</p>
      <hr />
      <p>
        Here is the email content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default EmailDetail;
