import React from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <div className="compose-button-container">
          <Link to="/compose" className="compose-button">Compose Email</Link>
        </div>
        <ul>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
          <li>
            <Link to="/sent">Sent</Link>
          </li>
          <li>
            <Link to="/drafts">Drafts</Link>
          </li>
          {/* Additional navigation items can be added here */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;