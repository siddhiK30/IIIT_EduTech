// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// ... (keep your existing imports)
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Main from './components/AssessmentsPages/Main';
import LecturePage1 from './components/Learning/LecturePage1';
import Blogs from './components/Engagement/Blogs';
import LectureDetailPage from './components/Learning/LectureDetail';
// import Chat from './components/ChatBot/Chat';
import SolarSystem from './components/SolarSystem';
import QRCodeList from './components/QRCodeList';
import BlogDetail from './components/Engagement/BlogDetail';
import Quiz from './components/AssessmentsPages/Quiz';
import Chat from './components/ChatBot/Chat';
import ChatBotIcon from './components/ChatBot/ChatBotIcon';
import ConnectIQ from './components/ConnectIQ';
import Visualisation from './components/Visualisation.jsx/Visualisation';
import Chat1 from './components/ChatBot/Chat1';

const App = () => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Routes where NavBar should not be displayed
  const noNavBarRoutes = ['/signin', '/'];
  
  // Routes where ChatBot should not be displayed
  const noChatBotRoutes = ['/signin'];

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
        <Route path="/support" element={<Chat1 />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/solar" element={<SolarSystem />} />
        <Route path="/chem3d" element={<QRCodeList />} />
        <Route path="/connectIQ" element={<ConnectIQ />} />
        <Route path="/visualise" element={<Visualisation />} />
      </Routes>

      {/* Render ChatBot Icon and Chat component if not in excluded routes */}
      {!noChatBotRoutes.includes(location.pathname) && (
        <>
          <ChatBotIcon isOpen={isChatOpen} toggleChat={toggleChat} />
          <Chat isOpen={isChatOpen} toggleChat={toggleChat} />
        </>
      )}
    </div>
  );
};

export default App;