import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';

// pages
import Home from './pages/Home.tsx';
// static pages
import About from './pages/static/About.tsx';
import Contact from './pages/static/Contact.tsx';
import Responsibility from './pages/static/Responsibility.tsx';
import Payanddelivery from './pages/static/Payanddelivery.tsx';
import Confidentiality from './pages/static/Confidentiality.tsx';
import Agreement from './pages/static/Agreement.tsx';
import Emailagreement from './pages/static/Emailagreement.tsx';


function App() {
  return (
    <>
      <Navbar />
      <Routes >
        <Route path="/" exact element={ <Home /> } />
        {/* Static pages */}
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/responsibility" element={ <Responsibility /> } />
        <Route path="/payanddelivery" element={ <Payanddelivery /> } />
        <Route path="/confidentiality" element={ <Confidentiality /> } />
        <Route path="/agreement" element={ <Agreement /> } />
        <Route path="/emailagreement" element={ <Emailagreement /> } />
{/*        <Route path="/login" element={ <Login /> } />
        <Route path="/admin/login" element={ <LoginAdmin /> } />
        <Route path="/admin/register" element={ <RegisterAdmin /> } />
        */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
