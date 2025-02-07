import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Page1 from './LandingPages/Page1';
import Page2 from './LandingPages/Page2';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      // Trigger the animation by changing the state after the component mounts
      const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-full bg-[#dee0e0]'>
        {/* <NavBar /> */}
        <Page1/>
        <Page2/>
    </div>
  )
}

export default Home