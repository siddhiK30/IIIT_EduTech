import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Main from './components/AssessmentsPages/Main';
import MentorsList from './components/Learning/MentorsList';
import LecturePage1 from './components/Learning/LecturePage1';
import LecturePage2 from './components/Learning/LecturePage2';
import LecturePage3 from './components/Learning/LecturePage3';


const App = () => {
  return (
    <div className=''>
        <NavBar/>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/assessment" element={<Main/>} />
            <Route path="/core_learning" element={<MentorsList/>} />
            <Route path="/core_learning/mentor1" element={<LecturePage1/>} />
            <Route path="/core_learning/mentor2" element={<LecturePage2/>} />
            <Route path="/core_learning/mentor3" element={<LecturePage3/>} />
            

          </Routes>

    </div>
  )
}




export default App
