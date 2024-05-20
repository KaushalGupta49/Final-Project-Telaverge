import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {AppProvider} from './context/AppContext';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<RegisterPage />} />
        <Route path='/app' element={<RegisterPage />} />
        <Route path='/app/register' element={<RegisterPage />} />
        <Route path='/app/login' element={<LoginPage />} />
        <Route path='/app/search' element={<SearchPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
