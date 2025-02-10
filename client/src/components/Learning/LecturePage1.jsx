import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const LecturePage1 = () => {
  const { id } = useParams()
  console.log(id)

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='px-10 text-4xl mt-5'>
      <h2 className="text-4xl font-bold border-b border-b-gray-600">"Course_name" by "Mentor_Name"</h2>
      <div className='flex justify-around'>
        <div className='w-[65vw] h-[80vhvh]'>

          <div className="border border-gray-300 rounded-lg mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <h2 className="text-lg font-semibold">1. Topic Name</h2>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-300">
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <h2 className="text-lg font-semibold">1. Topic Name</h2>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-300">
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <h2 className="text-lg font-semibold">1. Topic Name</h2>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-300">
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <h2 className="text-lg font-semibold">1. Topic Name</h2>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-300">
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <h2 className="text-lg font-semibold">1. Topic Name</h2>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-300">
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
                <p className="text-gray-700">Subtopics</p>
              </div>
            )}
          </div>

        </div>
        <div className='h-[80vh] w-[25vw] bg-amber-300'>

        </div>
      </div>
    </div>
  )
}

export default LecturePage1