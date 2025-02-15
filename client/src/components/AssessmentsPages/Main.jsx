import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const Main = () => {
  const [activePage, setActivePage] = useState('Page2');

  const renderPage = () => {
    switch (activePage) {
      case 'Page1':
        return <Page1 />;
      case 'Page2':
        return <Page2 setActivePage={setActivePage} />;  // Pass setActivePage to Page2
      case 'Page3':
        return <Page3 />
      default:
        return <Page2 />;
    }
  };

  return (
    <div className="bg-[#dee0e0] flex">
      {/* Sidebar Animation */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="h-screen bg-white shadow-lg"
      >
        <Sidebar setActivePage={setActivePage} />
      </motion.div>

      {/* Page Content with Fade-in Animation */}
      <motion.div
        className="flex-1 p-4 justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderPage()}
      </motion.div>
    </div>
  );
};

export default Main;
