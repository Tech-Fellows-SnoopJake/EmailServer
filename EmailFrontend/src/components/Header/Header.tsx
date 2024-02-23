import React, { useState } from 'react';

import './Header.css';

const Header: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    // Toggles the dropdown list
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
    return (
      <header className="header">
        <div className="logo">
          EmailBox
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search in mail" className="search-input"/>
        </div>
        <div className="user-profile" onClick={toggleDropdown}>
          {/* User profile icon */}
          <img src="path-to-your-user-icon.svg" alt="User profile" className="profile-icon"/>
          {/* Dropdown list */}
          {isDropdownOpen && (
            <div className="dropdown">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;
  