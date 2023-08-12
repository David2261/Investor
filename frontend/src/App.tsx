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


function App() {
  return (
    <>
      <Navbar />
      <Routes >
        <Route path="/" exact element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/responsibility" element={ <Responsibility /> } />
{/*        <Route path="/login" element={ <Login /> } />
        <Route path="/confidentiality" element={ <Confidentiality /> } />
        <Route path="/payanddelivery" element={ <Payanddelivery /> } />
        <Route path="/emailagreement" element={ <Emailagreement /> } />
        <Route path="/agreement" element={ <Agreement /> } />
        <Route path="/admin/login" element={ <LoginAdmin /> } />
        <Route path="/admin/register" element={ <RegisterAdmin /> } />
        */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
