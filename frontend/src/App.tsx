import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar.tsx';
// pages
import Home from './pages/Home.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes >
        <Route path="/" exact element={ <Home /> } />
{/*        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/responsibility" element={ <Resposibility /> } />
        <Route path="/confidentiality" element={ <Confidentiality /> } />
        <Route path="/payanddelivery" element={ <Payanddelivery /> } />
        <Route path="/emailagreement" element={ <Emailagreement /> } />
        <Route path="/agreement" element={ <Agreement /> } />
        <Route path="/admin/login" element={ <LoginAdmin /> } />
        <Route path="/admin/register" element={ <RegisterAdmin /> } />
        */}
      </Routes>
    </>
  )
}

export default App
