import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Course/Main';
import Playlist from './Course/Playlist';
import Lazy from './Lazy';
import CourseView from './Pages/CourseView';
import Forgot from './Pages/Forgot';
import ResetPage from './Pages/ResetPage';
import Verify from './Pages/Verify';
import ScrollToTop from './ScrollToTop';
import Header from "./Inc/Header";
import Footer from "./Inc/Footer";

const UploadWebsite = React.lazy(() => import("./Pages/UploadWebsite"));
const UploadImage = React.lazy(() => import("./Pages/UploadImage"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const ContactPage = React.lazy(() => import("./Pages/ContactPage"));
const Home = React.lazy(() => import("./Pages/Home"));
const Courses = React.lazy(() => import("./Pages/Courses"));
const ImagePage = React.lazy(() => import("./Pages/ImagePage"))
const TemplatePage = React.lazy(() => import("./Pages/TemplatePage"));
const TemplateView = React.lazy(() => import("./Pages/TemplateView"))
const WorkWithUs = React.lazy(() => import("./Pages/WorkWithUs"))
const LoginPage = React.lazy(() => import("./Pages/LoginPage"))
const RegisterPage = React.lazy(() => import("./Pages/RegisterPage"))
const About = React.lazy(() => import("./Pages/About"))

const App: React.FC = () => {
  return (
    <>
      <Header />
      <React.Suspense fallback={<Lazy />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/loading' element={<Lazy />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/images' element={<ImagePage />} />
          <Route path='/web-templates' element={<TemplatePage />} />
          <Route path='/work-with-me' element={<WorkWithUs />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/web-templates/view/:id' element={<TemplateView />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload-image' element={<UploadImage />} />
          <Route path='/upload-website' element={<UploadWebsite />} />
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/change-password/:email' element={<ResetPage />} />
          <Route path='/verify/:email' element={<Verify />} />
          <Route path='/manager/*' element={<Main />} />
          <Route path='*' element={<Lazy />} />
          <Route path='/course/:course_name' element={<CourseView />} />
          <Route path='/course/:course_name/:id' element={<Playlist />} />
        </Routes>
      </React.Suspense>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
