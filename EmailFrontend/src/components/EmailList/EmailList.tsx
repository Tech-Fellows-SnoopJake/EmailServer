import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmailList.css';

interface Email {
  id: number;
  sender: string;
  subject: string;
  date: string;
}


const EmailList = () => {
  const [emails, setEmails] = useState<Email[]>([]);


  useEffect(() => {
    const fetchEmails = async () => {

      // for the demo, we have to get rid of this example email
      const senderEmail = "example@example.com";

      try {
        
        const response = await axios.get(`/api/emails`, {
          params: { senderEmail: senderEmail },
          /* this bit is for when we have login implemented {
            Authorization: `Bearer ${token}`, // Ensure you have a token variable available
          },
          */
        });

        // Defensive programming if we dont get an array (or a null type due to an API error)
        // we default to an empty array
        setEmails(Array.isArray(response.data) ? response.data : []); // response data should be array of emails

      } catch (error) {
        console.error("Failed to fetch emails:", error);
        //error handling
      }
    };

    fetchEmails();
  }, []); // Dependency array is empty, so this effect runs once when the component mounts

  return (
    <div className="email-list">
      {emails.length > 0 ? (
        emails.map(email => (
          <div key={email.id} className="email-item">
            <span className="email-sender">{email.sender}</span>
            <span className="email-subject">{email.subject}</span>
            <span className="email-date">{email.date}</span>
            <Link to={`/email/${email.id}`} state={{ email: email }}  className="view-email">View</Link>
          </div>
        ))
      ) : (
        <div className="email-list-empty">
          This is your email list, but it's empty.
          <br />
          You should get some friends to talk to!
        </div>
      )}
    </div>
  );
  
};

export default EmailList;
