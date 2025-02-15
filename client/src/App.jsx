import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Main from './components/AssessmentsPages/Main';
import LecturePage1 from './components/Learning/LecturePage1';
import Blogs from './components/Engagement/Blogs';
import LectureDetailPage from './components/Learning/LectureDetail';
import Chat from './components/ChatBot/Chat';
import SolarSystem from './components/SolarSystem';
import QRCodeList from './components/QRCodeList';
import BlogDetail from './components/Engagement/BlogDetail';
import Quiz from './components/AssessmentsPages/Quiz';

const App = () => {
  const location = useLocation();  // Get the current route

  // Routes where NavBar should not be displayed
  const noNavBarRoutes = ['/signin', '/'];

  return (
    <div className=''>
      {/* Conditionally render NavBar */}
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/" element={<SignUp />} />
        <Route path="/assessment" element={<Main />} />
        <Route path="/core_learning" element={<LecturePage1 />} />
        <Route path="/core_learning/mentor/:id" element={<LecturePage1 />} />
        <Route path="/enangement" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/lecture/:id" element={<LectureDetailPage />} />
        <Route path="/support" element={<Chat />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/solar" element={<SolarSystem />} />
        <Route path="/chem3d" element={<QRCodeList />} />
      </Routes>
    </div>
  );
};

export default App;
