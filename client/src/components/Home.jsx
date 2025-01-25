import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Page1 from './LandingPages/Page1';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      // Trigger the animation by changing the state after the component mounts
      const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className='px-10 h-screen bg-green-100'>
        <NavBar />
        <Page1/>

    </div>
  )
}

export default Home