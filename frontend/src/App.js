import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// Dynamic pages
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Contact} from './pages/Contact'
import {Login} from './pages/Login'
// Static pages
import {Resposibility} from './pages/stable/Resposibility'
import {Confidentiality} from './pages/stable/Confidentiality'
import {Payanddelivery} from './pages/stable/Payanddelivery'
import {Emailagreement} from './pages/stable/Emailagreement'
import {Agreement} from './pages/stable/Agreement'
// Components
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
// Hooks
import { useInView } from 'react-intersection-observer';
// SCSS
import "./assets/sass/Header.scss"


function App() {
  const {ref, inView} = useInView({
        threshold: 0.8,
    });

  return (
    <BrowserRouter >
    <nav
    className={`navbar fixed-top px-4 navbar-dark navbar-expand-lg bg-primary ${inView == true ? 'h_header' : 'l_header'}`}>
      <Navbar />
    </nav>
    <div className="container py-7" ref={ref}>
    <div className="empty_box"></div>
      <Routes >
        <Route path="/" exact element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/responsibility" element={ <Resposibility /> } />
        <Route path="/confidentiality" element={ <Confidentiality /> } />
        <Route path="/payanddelivery" element={ <Payanddelivery /> } />
        <Route path="/emailagreement" element={ <Emailagreement /> } />
        <Route path="/agreement" element={ <Agreement /> } />
      </Routes>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
