import React, { useEffect, useState } from 'react'

const Page1 = () => {
    const [animateText, setAnimateText] = useState(false);
    const [animateBoxes, setAnimateBoxes] = useState(false);

    useEffect(() => {
        // Trigger animations after the component mounts
        const timer = setTimeout(() => {
            setAnimateText(true); // Start text animation
        }, 100); // Slight delay to ensure smooth transition

        const timer2 = setTimeout(() => {
            setAnimateBoxes(true); // Start boxes animation
        }, 300); // Delay for box animation

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);
  return (
    <div className="flex flex-col justify-center">
            {/* Text Section Animation */}
            <div
                className={`text-center text-5xl font-serif mt-10 transform transition-transform duration-1000 ease-out ${
                    animateText ? "scale-100" : "scale-0"
                }`}
            >
                <p className='pb-2'>Find the best <span className='bg-green-700 rounded-4xl px-4'>AI Learning</span></p>
                <p>for growth of your skills & define</p>
                <p>your <span className='bg-yellow-300 rounded-4xl px-4'>career</span>path.</p>
            </div>

            {/* Boxes Section Animation */}
            <div
                className={`w-[80vw] h-[60vh] mx-auto mt-5 flex justify-between items-center gap-4 transition-all duration-1000 ease-out ${
                    animateBoxes
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[500px] opacity-0"
                }`}
            >
                <div className="w-full h-[30vh] bg-yellow-200 hover:scale-110 transition ease-linear"></div>
                <div className="w-full h-[45vh] bg-gray-400 hover:scale-110 transition ease-linear"></div>
                <div className="w-full h-full bg-orange-300 hover:scale-110 transition ease-linear text-center">Images or something can be added</div>
                <div className="w-full h-[45vh] bg-pink-400 hover:scale-110 transition ease-linear"></div>
                <div className="w-full h-[30vh] bg-blue-500 hover:scale-110 transition ease-linear"></div>
            </div>
        </div>
  )
}

export default Page1