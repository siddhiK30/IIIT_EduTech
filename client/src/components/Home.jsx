import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      // Trigger the animation by changing the state after the component mounts
      const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className='px-10'>
        <NavBar />
        <div className={`w-full h-screen text-center text-2xl bg-amber-100 transition-transform duration-[1.5s] ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>

            Home Page
            
        </div>
    </div>
  )
}

export default Home