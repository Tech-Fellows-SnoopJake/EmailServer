import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EmailList from './components/EmailList/EmailList';
import EmailDetail from './components/EmailDetail/EmailDetail';
import ComposeEmail from './components/ComposeEmail/ComposeEmail';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/inbox" Component={EmailList} />
        <Route path="/email/:id" Component={EmailDetail} />
        <Route path="/compose" Component={ComposeEmail} />
        <Route path="/" Component={EmailList} />
      </Routes>
    </Router>
  );
}

export default App;