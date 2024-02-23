import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        SnoopJake EmailBox
      </div>
      <div className="search">
        {/* Search component goes here*/}
      </div>
      <div className="user-profile">
        {/* User profile icon or dropdown goes here */}
      </div>
    </header>
  );
};

export default Header;
