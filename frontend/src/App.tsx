import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Entities
import PrivateRoute from "./entities/routers/PrivateRoute.tsx";
import LayoutRoute from './entities/routers/LayoutRoute.tsx';
import AdminLayoutRoute from './entities/routers/AdminLayoutRoute.tsx';
// Pages
import Home from './pages/Home.tsx';
import ArticleNews from './pages/posts/ArticleNews.tsx';
// Static pages
import About from './pages/static/About.tsx';
import Contact from './pages/static/Contact.tsx';
import Responsibility from './pages/static/Responsibility.tsx';
import Payanddelivery from './pages/static/Payanddelivery.tsx';
import Confidentiality from './pages/static/Confidentiality.tsx';
import Agreement from './pages/static/Agreement.tsx';
import Emailagreement from './pages/static/Emailagreement.tsx';
import NotFound from './pages/static/NotFound.tsx';
// Posts
import News from './pages/posts/News.tsx';
import Bonds from './pages/posts/Bond.tsx';
// Admin
// import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminMain from './pages/admin/AdminMain.tsx';
import AdminApps from './pages/admin/AdminApps.tsx';
import AdminUpload from './pages/admin/AdminUpload.tsx';
import AdminCreate from './pages/admin/AdminCreate.tsx';
// Personal
import Portfolio from './pages/personal/Portfolio.tsx';

function App() {
  return (
    <div className="w-full h-full relative no-scroll-y">
      <Helmet
          defaultTitle="Investor Home"
          titleTemplate="Investor Home | %s"
        />
      <Routes>
          <Route path="/" element= { <LayoutRoute /> }>
            <Route index element={ <Home /> } />
            {/* Static pages */}
            <Route path="about" element={ <About /> } />
            <Route path="contact" element={ <Contact /> } />
            <Route path="responsibility" element={ <Responsibility /> } />
            <Route path="payanddelivery" element={ <Payanddelivery /> } />
            <Route path="confidentiality" element={ <Confidentiality /> } />
            <Route path="agreement" element={ <Agreement /> } />
            <Route path="emailagreement" element={ <Emailagreement /> } />
            <Route path="news" element={ <News /> } />
            {/* Private pages */}
            <Route element={<PrivateRoute />} >
              <Route path="bonds" element={ <Bonds /> } />
              <Route path="portfolio" element={ <Portfolio /> } />
              <Route path="news/:category/:slug" element={ <ArticleNews />} />
            </Route>
          </Route>
          {/* Admin page */}
          {/* <Route path="/admin" element={ <HomeAdmin />}></Route> */}
          <Route path="/admin" element={ <AdminLayoutRoute /> }>
            {/* <Route index path="login" element={ <AdminLogin /> } /> */}
            <Route index path="main" element={ <AdminMain /> } />
            <Route path="main/:apps" element={ <AdminApps /> } />
            <Route path="main/:apps/upload" element={ <AdminUpload /> } />
            <Route path="main/:apps/create" element={ <AdminCreate /> } />
            {/* <Route path="article/list" element={ <AdminArticleList /> } /> */}
          </Route>
          <Route path='*' element={ <NotFound />} />
      </Routes>
    </div>
  )
}

export default App
