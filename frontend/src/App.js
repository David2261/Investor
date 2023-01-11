import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Contact} from './pages/Contact'
import {Login} from './pages/Login'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'


function App() {
  return (
    <BrowserRouter >
    <Navbar />
    <div className="container py-5">
      <Routes >
        <Route path="/" exact element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
