import React from 'react';
import { motion } from 'framer-motion';

const Page3 = () => {
  const redirectToCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/0/r', '_blank');
  };

  return (
    <motion.div 
      className="w-[50vw] bg-white p-6 rounded-lg shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6">Upcoming Meetings</h2>
      
      <div className="space-y-4">
        {/* Parent-Teacher Conference */}
        <div 
          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300"
          onClick={redirectToCalendar}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg 
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Parent-Teacher Conference</h3>
              <p className="text-gray-600 mb-2">Tomorrow at 3:00 PM</p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Pending Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Study Group Session */}
        <div 
          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300"
          onClick={redirectToCalendar}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg 
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Study Group Session</h3>
              <p className="text-gray-600 mb-2">Friday at 4:00 PM</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Page3;