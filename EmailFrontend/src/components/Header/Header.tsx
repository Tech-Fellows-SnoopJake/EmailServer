import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import iconSvg from '../../assets/avatar.svg';

const Header: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    // Toggles the dropdown list
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    //Logout function
    const handleLogout = () => {
      // Limpia el localStorage o las cookies, según sea necesario
      localStorage.removeItem("id");
      localStorage.removeItem("username");

      window.location.href = "/login";

      // Si estás usando un router como react-router-dom, podrías hacer:
      // history.push('/login');
    };
  
    return (
      <header className="header flex justify-between bg-[#274073] p-6 text-[#f2f2f2]  font-poppins">
        <div className="logo text-2xl font-bold" >
        <Link to="/inbox">SnoopJake MailBox</Link>
        </div>
        <div className="search-bar w-96 text-center">
          <input type="text" placeholder="Search in mail" className="search-input w-96 text-center text-base p-2 border-0 rounded-[4px] mr-4 text-[#000] "/>
        </div>
        <div className="user-profile relative cursor-pointer" onClick={toggleDropdown} role='button'>
          {/* User profile icon */}
          <img src={iconSvg} alt="User profile" className="profile-icon size-10"/>
          {/* Dropdown list */}
          {isDropdownOpen && (
            <div className="dropdown absolute top-full right-0 bg-white border border-solid border-[#CCC] rounded-[4px] w-[150px] z-1000">
              <ul className='list-none m-0 p-0'>
                <li className="p-2 text-black cursor-pointer hover:bg-gray-200 ">Profile</li>
                <li className="p-2 text-black cursor-pointer hover:bg-gray-200">Settings</li>
                  <li className="p-2 text-black cursor-pointer hover:bg-gray-200" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </header>
    );
};

export default Header;
  