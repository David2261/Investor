import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Login} from './pages/Login'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'


function App() {
  return (
    <BrowserRouter >
    <Navbar />
    <div className="container pt-4">
      <Routes >
        <Route path="/" exact element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
