import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      const senderEmail = "julian@snoopjake.com";
      const API_URL = "http://34.227.46.194:8000";
      try {
        
        const response = await axios.get(`${API_URL}/sendlist/${senderEmail}/`);
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
    <div className="email-list flex flex-col">
      {emails.length > 0 ? (
        emails.map(email => (
          <div key={email.id} className="email-item flex justify-between items-center p-2 border-b border-gray-300">
            <span className="email-sender flex-1">{email.sender}</span>
            <span className="email-subject flex-2">{email.subject}</span>
            <span className="email-date flex-1 text-right">{email.date}</span>
            <Link to={`/email/${email.id}`} state={{ email: email }} className="view-email ml-4">View</Link>
          </div>
        ))
      ) : (
        <div className="email-list-empty text-gray-600 text-center mt-4 italic">
          This is your email list, but it's empty.
          <br />
          You should get some friends to talk to!
        </div>
      )}
    </div>
  );
  
};

export default EmailList;
