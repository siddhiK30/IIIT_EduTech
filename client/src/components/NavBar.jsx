// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//     return (
//         <div className='h-[70p] flex items-center justify-center mx-10 px-10'>
//             <Link to="/" className='text-black text-3xl'>
//                 HackoFiesta
//             </Link>
//             <div className='w-1/3 m-auto my-5 rounded-md'>
//                 <nav className='flex items-center w-full h-16 bg-gray-800 rounded-full'>
//                     <div className='flex justify-around w-full text-3xl h-full'>
//                         <div className='bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:translate-x-2'>
//                             <Link to="/" className='text-white'>Home</Link>
//                         </div>
//                         <div className='bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2'>
//                             <Link to="/about" className='text-white'>About</Link>
//                         </div>
//                         <div className='bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2'>
//                             <Link to="/contact" className='text-white'>Contact</Link>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//             <div className='w-50 h-16 flex justify-around'>
//                 <div className='flex justify-center items-center h-full'>
//                     <Link to="/login" className='text-white text-2xl bg-gray-800 hover:bg-white hover:text-black hover:border hover:border-black px-6 py-3 rounded-full mr-5'>Login</Link>
//                 </div>
//                 <div className='flex justify-center items-center h-full'>
//                     <Link to="/signup" className='text-white text-2xl bg-gray-800 hover:bg-white hover:text-black hover:border hover:border-black px-6 py-3 rounded-full mr-5'>Signup</Link>
//                 </div>
//             </div>

//         </div>

//     );
// }

// export default NavBar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the animation by changing the state after the component mounts
        const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`h-[70px] flex items-center justify-center mx-10 px-10 pt-10 transition-transform duration-[1.5s] ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
        >
            <Link to="/" className="text-black text-3xl mb-4">
                HackoFiesta
            </Link>
            <div className="w-1/3 m-auto my-5 rounded-md">
                <nav className="flex items-center w-full h-16 bg-gray-800 rounded-full">
                    <div className="flex justify-around w-full text-3xl h-full">
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:translate-x-2">
                            <Link to="" className="text-white">
                                Home
                            </Link>
                        </div>
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2">
                            <Link to="/about" className="text-white">
                                About
                            </Link>
                        </div>
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2">
                            <Link to="/contact" className="text-white">
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="w-50 h-16 flex justify-around">
                <div className="flex justify-center items-center h-full">
                    <Link
                        to="/signin"
                        className="text-black hover:text-white text-2xl hover:bg-gray-800 bg-white border border-black px-6 py-3 rounded-full mr-5 transition duration-600"
                    >
                        SignIn
                    </Link>
                </div>
                <div className="flex justify-center items-center h-full">
                    <Link
                        to="/signup"
                        className="text-black hover:text-white text-2xl hover:bg-gray-800 bg-white border border-black px-6 py-3 rounded-full mr-5 transition duration-600"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

