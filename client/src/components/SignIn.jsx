import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  const navigate=useNavigate()

  useEffect(() => {
    // Reset animation states when component mounts (re-renders)
    setAnimateLeft(false);
    setAnimateRight(false);

    // Trigger the animation after a short delay to allow the reset
    const timer = setTimeout(() => {
      setAnimateLeft(true);
      setAnimateRight(true);
    }, 50);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Login successful');
    // Reset form inputs
    setEmail('');
    setPassword('');
    // Redirect to dashboard page or handle login logic
    navigate('/');

  };

  return (
    <div className="flex h-screen">
      {/* Left div */}
      <div
        className={`w-1/2 h-screen overflow-hidden flex transform ${
          animateLeft ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-[1s] ease-out`}
      >
        <img
          src="https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg"
          alt=""
          className="w-full border-black"
        />
      </div>

      {/* Right div */}
      <div
        className={`w-1/2 h-full mx-auto transform ${
          animateRight ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-[1s] ease-out mt-50`}
      >
        <div>
          <form className="max-w-md mx-auto" onSubmit={submitHandler}>
            <h2 className="text-3xl font-bold text-center mb-10">Sign In</h2>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <br />
            <Link to="/signup" className="text-sm text-blue-600">
              Not have an account? Create a new account
            </Link>
            <Link to="/" className="text-sm text-blue-600">
              Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
