import React, { useState } from 'react';
import './ComposeEmail.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 



const ComposeEmail: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit logic not yet implemented, sorry UwU
    console.log('Sending email:', { to, subject, body });
    
  };
  console.log("IM SUCCESFULLY INSIDE COMPOSEMAIL start");
  return (

    
    <div className="compose-email">
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
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};



export default ComposeEmail;
