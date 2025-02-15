import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutProject } from '../actions/projectActions';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.userLogin);
    const { userInfo, isAuthenticated } = auth;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    useEffect(() => {
        if (userInfo) {
            try {
                const token = userInfo.access;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedPayload = JSON.parse(atob(base64));
                const userId = decodedPayload.user_id;
                dispatch(getUserDetails(userInfo.access, userId));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [dispatch, userInfo]);

    const logoutHandler = () => {
        dispatch(logoutProject());
    };

    const authlinks = (
        <div className='flex items-center space-x-6'>
            <div className='text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 
                           px-4 py-2 rounded-lg shadow-lg'>
                Welcome, <span className="font-bold">{user?.name}</span>
            </div>
            <button
                onClick={logoutHandler}
                className="relative px-6 py-2 font-semibold text-white bg-gradient-to-r from-red-500 
                         to-pink-500 rounded-lg shadow-lg overflow-hidden transition-all duration-200 
                         hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 
                         focus:ring-pink-500 focus:ring-offset-2"
            >
                <span className="relative z-10">Sign Out</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
            </button>
        </div>
    );

    const guestlinks = (
        <div className="flex items-center space-x-4">
            <Link to="/signin">
                <button className="relative px-6 py-2 font-semibold text-white bg-gradient-to-r 
                                 from-cyan-500 to-blue-500 rounded-lg shadow-lg overflow-hidden 
                                 transition-all duration-200 hover:scale-105 hover:shadow-xl 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
                </button>
            </Link>
            <Link to="/signup">
                <button className="relative px-6 py-2 font-semibold text-white bg-gradient-to-r 
                                 from-purple-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden 
                                 transition-all duration-200 hover:scale-105 hover:shadow-xl 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
                </button>
            </Link>
        </div>
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`bg-gray-900 backdrop-blur-lg bg-opacity-80 shadow-2xl transition-all duration-500 
                        border-b border-gray-800 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/home" className="flex items-center group">
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 
                                     to-indigo-600 bg-clip-text text-transparent animate-gradient-x 
                                     transition-all duration-300 group-hover:scale-105">
                            HackoFiesta
                        </span>
                    </Link>

                    <nav className="hidden md:flex space-x-1">
                        <Link className='relative px-4 py-2 text-gray-300 font-medium rounded-lg 
                                         transition-all duration-200 hover:text-white group' to={'/home'}>
                            Home
                        </Link>
                        {['Connect', 'ARClass'].map((item, index) => (
                            <Link
                                key={item}
                                to={item === 'ARClass' ? "http://127.0.0.1:5500/client/src/utilities/index.html" : ""}
                                target={item === 'ARClass' ? "_blank" : ""}
                                rel={item === 'ARClass' ? "noopener noreferrer" : ""}
                                className="relative px-4 py-2 text-gray-300 font-medium rounded-lg 
                                         transition-all duration-200 hover:text-white group"
                            >
                                <span className="relative z-10">{item}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 
                                              rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                                              duration-200 -z-0"></div>
                            </Link>
                        ))}

                        <div className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onClickCapture={() => setShowDropdown(false)}>
                            <button className="relative px-4 py-2 text-gray-300 font-medium rounded-lg 
                                           transition-all duration-200 hover:text-white group">
                                <span className="relative z-10">Visualization</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 
                                              rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                                              duration-200 -z-0"></div>
                            </button>
                            {showDropdown && (
                                <div className="absolute left-0 mt-2 w-48 rounded-xl overflow-hidden 
                                              shadow-2xl bg-gray-900 border border-gray-800 backdrop-blur-lg 
                                              bg-opacity-90 transform transition-all duration-200">
                                    <div className="py-1">
                                        <a href="http://127.0.0.1:5500/client/src/utilities/thesolsystem.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white 
                                                    transition-colors duration-200 hover:bg-gradient-to-r 
                                                    hover:from-purple-600 hover:to-pink-600">
                                            Solar System
                                        </a>
                                        <a href="chem3d/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white 
                                                    transition-colors duration-200 hover:bg-gradient-to-r 
                                                    hover:from-purple-600 hover:to-pink-600">
                                            Second Option
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="flex items-center">
                        {isAuthenticated ? authlinks : guestlinks}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;