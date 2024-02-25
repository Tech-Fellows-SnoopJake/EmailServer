import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmailList from './components/EmailList/EmailList';
import EmailDetail from './components/EmailDetail/EmailDetail';
import ComposeEmail from './components/ComposeEmail/ComposeEmail';
import './styles/global.css';
import Login from './components/Login/Login';

function App() {
  return (
    <Login />

    
  );
}
<Router>
      <Header />
      <div className="main-container">
      <Sidebar />
      <div className="content-area">
        <Routes>
          <Route path="/inbox" element={<EmailList />} />
          <Route path="/email/:id" element={<EmailDetail />} />
          <Route path="/compose" element={<ComposeEmail />} />
          <Route path="/" element={<EmailList />} />
        </Routes>
      </div>
    </div>
  </Router>
export default App;