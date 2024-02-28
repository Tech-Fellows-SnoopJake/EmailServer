import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmailList from './components/EmailList/EmailList';
import EmailDetail from './components/EmailDetail/EmailDetail';
import ComposeEmail from './components/ComposeEmail/ComposeEmail';
import Login from './components/Login/Login';
import Register from './components/Register/Register';  
import { Outlet } from 'react-router-dom';

function App() {
  // Assuming you have a way to check if the user is logged in
  const isLoggedIn = () => {
    // Check login status, for now, let's assume a simple check
    // This should eventually check actual authentication status
    return !!localStorage.getItem('userLoggedIn'); // Example check
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Redirect from root to either Login or Inbox based on login status */}
        <Route path="/" element={isLoggedIn() ? <Navigate to="/inbox" /> : <Navigate to="/login" />} />
        {/* Layout route for authenticated users */}
        <Route path="/" element={<Layout />}>
          <Route path="inbox" element={<EmailList />} />
          <Route path="email/:id" element={<EmailDetail />} />
          <Route path="compose" element={<ComposeEmail />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

// Component to wrap the layout with Header and Sidebar
const Layout = () => (
  <>
    <Header />
    <div className="main-container flex ">
      <Sidebar />
      <div className="content-area grow p-5 overflow-y-auto ">
        {/* Outlet will render the nested route components */}
        <Outlet />
      </div>
    </div>
  </>
);

export default App;
