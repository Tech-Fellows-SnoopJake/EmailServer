import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';


const EmailDetail = () => {
  const location = useLocation();
  const email = location.state?.email; // Access the passed email data
  const sanitizedBody = DOMPurify.sanitize(email.body);


  if (!email) {
    return <div className="email-detail-frame border border-gray-300 mx-auto p-4 rounded-md shadow-md max-w-2xl bg-white">Email not found.</div>;
  }

  return (
    <div className="email-detail-frame border border-gray-300 mx-auto p-4 rounded-md shadow-md max-w-2xl bg-white">
      <h2 className="mb-4">{email.subject}</h2>
      <p className="mb-2"><strong>From:</strong> {email.sender}</p>
      <p className="mb-2"><strong>Date:</strong> {email.date}</p>
      <div
      className="email-body whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: sanitizedBody }}
      />
    </div>
  );
};

export default EmailDetail;
