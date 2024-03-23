import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {API_URL} from "../../utils/constants";

interface Email {
    id: number;
    sender: string;
    subject: string;
    date: string;
    receiver: string;
}

interface EmailListProps {
    typeEmail: string;
}

const EmailList = ({typeEmail}: EmailListProps) => {
    const [emails, setEmails] = useState<Email[]>([]);

    const history = useNavigate();
    useEffect(() => {
            const fetchEmails = async () => {
                const isAuthenticated = localStorage.getItem("username");
                if (!isAuthenticated) {
                    history("/login"); // Redirige al login si no está autenticado
                    return;
                }

                const typeList = typeEmail === "inbox" ? "mylist" : "sendlist";
                const receiverEmail = localStorage.getItem("username");

                try {
                    const response = await axios.get(`${API_URL}/${typeList}/${receiverEmail}/`);
                    setEmails(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    //error handling
                     console.error(`Hubo un error al recurar los emails: ${error}`);
                }
            }
            fetchEmails();

        }, [typeEmail, history]
    )
    ; // Add typeEmail to the dependency array

    return (
        <div className="email-list flex flex-col">
            {emails.length === 0 && (
                <div className="email-list-empty text-gray-600 text-center mt-4 italic">
                    This is your email list, but it's empty.
                    <br/>
                    You should get some friends to talk to!
                </div>
            )}
            {(typeEmail === "inbox") && (
                emails.map(email => (
                    <div key={email.id}
                         className="email-item flex justify-between items-center p-2 border-b border-gray-300">
                        <span className="email-sender flex-1">{email.sender}</span>
                        <span className="email-subject flex-2">{email.subject}</span>
                        <span className="email-date flex-1 text-right">{email.date}</span>
                        <Link to={`/email/${email.id}`} state={{email: email}}
                              className="view-email ml-4">View</Link>
                    </div>
                ))
            )}
            {(typeEmail === "send") && (
                emails.map(email => (
                    <div key={email.id}
                         className="email-item flex justify-between items-center p-2 border-b border-gray-300">
                        <span className="email-sender flex-1">{email.receiver}</span>
                        <span className="email-subject flex-2">{email.subject}</span>
                        <span className="email-date flex-1 text-right">{email.date}</span>
                        <Link to={`/email/${email.id}`} state={{email: email}}
                              className="view-email ml-4">View</Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default EmailList;
