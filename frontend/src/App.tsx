import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Login from './components/Login/ModalWin.tsx';

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
//posts
import Blog from './pages/posts/Blog.tsx';
// assets
import BGLogin from './assets/login_bg.jpg';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full h-full backdrop-blur-sm bg-white/30 fixed">
        <div className="grid items-center justify-center rounded-lg">
          <div className="fixed z-10 inset-x-1/3 inset-y-1/3 backdrop-blur-sm bg-white/30 rounded-md">
            <h1 className="text-4xl text-amber-600 py-4 px-32">Login</h1>
            <form action="" className="grid grid-cols-1 gap-4 px-2">
              <input type="email" name="username" id="username" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-cyan-600 outline outline-0 transition-all placeholder-shown:border-cyan-400 focus:border-yellow-500 focus:outline-0 disabled:border-0 disabled:bg-yellow-500" />
              <label htmlFor="username" className="after:content[' '] pointer-events-none absolute top-16 text-xl font-normal text-blue-gray-500 transition-all">Your email...</label>
              <input type="password" name="password" id="password" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-cyan-600 outline outline-0 transition-all placeholder-shown:border-cyan-200 focus:border-yellow-500 focus:outline-0 disabled:border-0 disabled:bg-yellow-500" />
              <label htmlFor="password" className="after:content[' '] pointer-events-none absolute top-36 text-xl font-normal text-blue-gray-500 transition-all">Your password...</label>
              <button type="button" data-ripple-light="true" className="items-center rounded-md bg-pink-500 py-3 px-6 w-1/3 font-sans text-xl font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Press</button>
            </form>
          </div>
          <div className="h-12">
            <img className="rounded-md" src={BGLogin} alt="" />
          </div>
        </div>
      </div>
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
        <Route path="/blog" element={ <Blog /> } />
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
