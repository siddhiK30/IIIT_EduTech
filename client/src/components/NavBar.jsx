import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutProject } from '../actions/projectActions';


const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();



    const auth = useSelector((state) => state.userLogin);
    const { loading, error, userInfo, isAuthenticated } = auth;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    // console.log(user)


    useEffect(() => {
        if (userInfo) {
            try {
                const token = userInfo.access;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedPayload = JSON.parse(atob(base64));
                const userId = decodedPayload.user_id; // Adjust this key based on your token's structure

                dispatch(getUserDetails(userInfo.access, userId)); // Pass the access token and user ID to fetch details
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [dispatch, userInfo]);


    const logoutHandler = () => {
        dispatch(logoutProject());
    };

    const authlinks = (
        <div className='flex items-center justify-between gap-4'>
            <div className='text-2xl font-bold'>
                Hiii {user?.name}
            </div>
            <button type="button" onClick={logoutHandler} className=
                "text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ">LogOut
            </button>
        </div>
    )

    const guestlinks = (
        <div>
            <Link to={"/signin"}>
                <button type="button" className=
                    "text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ">Sign In</button>

            </Link>
            <Link to={"/signup"}>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
            </Link>
        </div>
    )


    useEffect(() => {
        // Trigger the animation by changing the state after the component mounts
        const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`h-[70px] bg-[#dee0e0] flex items-center justify-center px-10 transition-transform duration-[1.5s] ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
        >
            <Link to="/" className="text-black text-3xl mb-4">
                HackoFiesta
            </Link>
            <div className="w-2/3 m-auto my-5 rounded-md">
                <nav className="flex items-center w-full h-16 bg-gray-800 rounded-full">
                    <div className="flex justify-around w-full text-3xl h-full">
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:translate-x-2">
                            <Link to="" className="text-white">
                                Home
                            </Link>
                        </div>
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:translate-x-2">
                            <Link to="" className="text-white">
                                Connect
                            </Link>
                        </div>
                        <div className="bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2">
                            <Link to="http://127.0.0.1:5501/index.html" target="_blank" rel="noopener noreferrer" className="text-white">
                                ARClass
                            </Link>
                        </div>
                        
                        <div
                            className="relative bg-gray-800 hover:bg-gray-500 h-full w-1/3 rounded-full text-center flex items-center justify-center transition-transform duration-300 hover:-translate-x-2"
                            onMouseEnter={() => setShowDropdown(true)}
                            onClickCapture={() => setShowDropdown(false)}
                        >
                            <span className="text-white cursor-pointer">
                                Visualizsation
                            </span>
                            {showDropdown && (
                                <div className="relative top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                                    <a
                                        href="http://127.0.0.1:5500/thesolsystem.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-t-lg cursor-pointer"
                                    >
                                        Solar System
                                    </a>
                                    <a
                                        href="chem3d/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-b-lg cursor-pointer"
                                    >
                                        Second Option
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
            <div className="w-50 h-16 flex justify-around py-3">
                {isAuthenticated ? authlinks : guestlinks}
            </div>
        </div>
    );
};

export default NavBar;

