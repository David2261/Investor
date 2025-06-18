import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Widgets
import Preloader from '@/widgets/preloader.tsx';
// Entities
import PrivateRoute from "./entities/routers/PrivateRoute.tsx";
import LayoutRoute from './entities/routers/LayoutRoute.tsx';
import AdminLayoutRoute from './entities/routers/AdminLayoutRoute.tsx';
// Pages (ленивая загрузка)
const Home = lazy(() => import('./pages/Home.tsx'));
const ArticleNews = lazy(() => import('./pages/posts/ArticleNews.tsx'));
// Static pages
const About = lazy(() => import('./pages/static/About.tsx'));
const Contact = lazy(() => import('./pages/static/Contact.tsx'));
const Responsibility = lazy(() => import('./pages/static/Responsibility.tsx'));
const Payanddelivery = lazy(() => import('./pages/static/Payanddelivery.tsx'));
const Confidentiality = lazy(() => import('./pages/static/Confidentiality.tsx'));
const Agreement = lazy(() => import('./pages/static/Agreement.tsx'));
const CyberSecurity = lazy(() => import('./pages/static/CyberSecurity.tsx'));
const Emailagreement = lazy(() => import('./pages/static/Emailagreement.tsx'));
const TermsOfUse = lazy(() => import('./pages/static/TermsOfUse.tsx'));
const SiteMap = lazy(() => import('./pages/static/SiteMap.tsx'));
const ConfidentialityCookies = lazy(() => import('./pages/static/ConfidentialityCookies.tsx'));
const NotFound = lazy(() => import('./pages/static/NotFound.tsx'));
// Components
const ResetPassword = lazy(() => import('./components/ModalForms/ResetPassword.tsx'));
// Posts
const News = lazy(() => import('./pages/posts/News.tsx'));
const Bonds = lazy(() => import('./pages/posts/Bond.tsx'));
// Admin
// const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.tsx'));
const AdminMain = lazy(() => import('./pages/admin/AdminMain.tsx'));
const AdminApps = lazy(() => import('./pages/admin/AdminApps.tsx'));
const AdminUpload = lazy(() => import('./pages/admin/AdminUpload.tsx'));
const AdminCreate = lazy(() => import('./pages/admin/AdminCreate.tsx'));
const AdminEdit = lazy(() => import('./pages/admin/AdminEdit.tsx'));

// Personal
const Portfolio = lazy(() => import('./pages/personal/Portfolio.tsx'));

function App() {
  return (
    <div className="w-full h-full relative no-scroll-y">
      <Helmet
        defaultTitle="Investor Home"
        titleTemplate="Investor Home | %s"
      />
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<LayoutRoute />}>
            <Route index element={<Home />} />
            {/* Static pages */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="responsibility" element={<Responsibility />} />
            <Route path="payanddelivery" element={<Payanddelivery />} />
            <Route path="confidentiality" element={<Confidentiality />} />
            <Route path="confidentialityandcookies" element={<ConfidentialityCookies />} />
            <Route path="cybersecurity" element={<CyberSecurity />} />
            <Route path="agreement" element={<Agreement />} />
            <Route path="termsofuse" element={<TermsOfUse />} />
            <Route path="sitemap" element={<SiteMap />} />
            <Route path="emailagreement" element={<Emailagreement />} />
            <Route path="resetpassword/:uidb64/:token" element={<ResetPassword />} />

            {/* Private pages */}
            <Route element={<PrivateRoute />}>
              <Route path="news" element={<News />} />
              <Route path="bonds" element={<Bonds />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="news/:category/:slug" element={<ArticleNews />} />
            </Route>
          </Route>

          {/* Admin pages */}
          <Route path="/admin" element={<AdminLayoutRoute />}>
            {/* <Route index path="login" element={<AdminLogin />} /> */}
            <Route index path="main" element={<AdminMain />} />
            <Route path="main/:apps" element={<AdminApps />} />
            <Route path="main/:apps/upload" element={<AdminUpload />} />
            <Route path="main/:apps/create" element={<AdminCreate />} />
            <Route path="main/:apps/edit/:category/:slug" element={<AdminEdit />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
