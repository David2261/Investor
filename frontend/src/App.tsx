import { Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './widgets/Navbar.tsx';
import Footer from './widgets/Footer.tsx';
// Entities
import PrivateRoute from "./entities/routers/PrivateRoute.tsx";
// Pages
import Home from './pages/Home.tsx';
// Static pages
import About from './pages/static/About.tsx';
import Contact from './pages/static/Contact.tsx';
import Responsibility from './pages/static/Responsibility.tsx';
import Payanddelivery from './pages/static/Payanddelivery.tsx';
import Confidentiality from './pages/static/Confidentiality.tsx';
import Agreement from './pages/static/Agreement.tsx';
import Emailagreement from './pages/static/Emailagreement.tsx';
// Posts
import Blog from './pages/posts/Blog.tsx';
import Bonds from './pages/posts/Bond.tsx';
// Admin
import HomeAdmin from './pages/admin/HomeAdmin.tsx';
// Personal
import Portfolio from './pages/personal/Portfolio.tsx';

function App() {
  return (
    <div className="w-full h-full relative">
      <Navbar />
      <Routes >
          <Route path="/" element={ <Home /> } />
          <Route element={<PrivateRoute children={undefined} />} >
            <Route path="/bonds" element={ <Bonds /> } />
            <Route path="/portfolio" element={ <Portfolio /> } />
          </Route>
          {/* Static pages */}
          <Route path="/about" element={ <About /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/responsibility" element={ <Responsibility /> } />
          <Route path="/payanddelivery" element={ <Payanddelivery /> } />
          <Route path="/confidentiality" element={ <Confidentiality /> } />
          <Route path="/agreement" element={ <Agreement /> } />
          <Route path="/emailagreement" element={ <Emailagreement /> } />
          <Route path="/blog" element={ <Blog /> } />
          {/* Admin page */}
          <Route path="/admin" element={ <HomeAdmin />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
