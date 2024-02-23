import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
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
          {/* we could more navigatrion stuff below*/}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
