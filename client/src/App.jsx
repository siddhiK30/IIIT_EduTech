import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Main from './components/AssessmentsPages/Main';
import MentorsList from './components/Learning/MentorsList';
import LecturePage1 from './components/Learning/LecturePage1';
import Blogs from './components/Engagement/Blogs';



const App = () => {
  return (
    <div className='bg-[#dee0e0]'>
        <NavBar/>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/assessment" element={<Main/>} />
            <Route path="/core_learning" element={<MentorsList/>} />
            <Route path="/core_learning/mentor/:id" element={<LecturePage1/>} />
            <Route path="/enangement" element={<Blogs/>} />
          </Routes>

    </div>
  )
}




export default App
