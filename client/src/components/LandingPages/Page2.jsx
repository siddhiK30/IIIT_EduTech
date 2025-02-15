import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Arrow from "../../assests/fast-forward.png";
import Assessmet from "../../assests/good-feedback.png";
import Core from "../../assests/artificial-intelligence.png";
import Enangement from "../../assests/presentation.png";
import Support from "../../assests/technical-support.png";

const Page2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, []);

  return (
    <div ref={pageRef} className="h-full">
      {/* Header Animation */}
    

      {/* Boxes Animation */}
      <div
        className={`grid grid-cols-4 gap-12 px-12 py-5 transition-all duration-1000 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-[500px] opacity-0"
        }`}
      >
        <Link
          to={"/assessment"}
          className="h-[50vh] bg-red-100 rounded-3xl flex flex-col items-center hover:bg-radial-[at_50%_25%] from-white to-zinc-900 to-75% hover:text-white hover:scale-110 transition ease-linear"
        >
          <div className="w-[125px] h-[125px] rounded-full mt-3">
            <img src={Assessmet} alt="" />
          </div>
          <div className="text-3xl font-serif font-bold text-center">
            Assessment & Progress
          </div>
          <p className="text-center font-serif mt-2">
            Adjusts questions based on how well you're doing, focusing on areas
            where you need more practice.
          </p>
          <div className="w-[40px] h-[40px] mt-2">
            <img src={Arrow} alt="" />
          </div>
        </Link>
        <Link
          to={"/core_learning"}
          className="h-[50vh] bg-red-100 rounded-3xl flex flex-col items-center hover:bg-radial-[at_50%_25%] from-white to-zinc-900 to-75% hover:text-white hover:scale-110 transition ease-linear"
        >
          <div className="w-[125px] h-[125px] rounded-full mt-2">
            <img src={Core} alt="" />
          </div>
          <div className="text-3xl font-serif font-bold text-center">
            Core Learning
          </div>
          <p className="text-center font-serif mt-12">
            Engagement via Emotional Intelligence, ConnectIQ Hub with AI-Driven
            Social Learning
          </p>
          <div className="w-[40px] h-[40px] mt-2">
            <img src={Arrow} alt="" />
          </div>
        </Link>
        <Link
          to={"/enangement"}
          className="h-[50vh] bg-red-100 rounded-3xl flex flex-col items-center hover:bg-radial-[at_50%_25%] from-white to-zinc-900 to-75% hover:text-white hover:scale-110 transition ease-linear"
        >
          <div className="w-[125px] h-[125px] rounded-full mt-2">
            <img src={Enangement} alt="" />
          </div>
          <div className="text-3xl font-serif font-bold text-center">
            Various Engagement Tools
          </div>
          <p className="text-center font-serif mt-2">
            Generates personalized blogs based on selected courses and topics
            of interest. Profile Building for Students and Teachers
          </p>
          <div className="w-[40px] h-[40px] mt-2">
            <img src={Arrow} alt="" />
          </div>
        </Link>
        <Link
          to={"/support"}
          className="h-[50vh] bg-red-100 rounded-3xl flex flex-col items-center hover:bg-radial-[at_50%_25%] from-white to-zinc-900 to-75% hover:text-white hover:scale-110 transition ease-linear"
        >
          <div className="w-[125px] h-[125px] rounded-full mt-2">
            <img src={Support} alt="" />
          </div>
          <div className="text-3xl font-serif font-bold text-center">
            Support & Accessibility
          </div>
          <p className="text-center font-serif mt-2">
            24/7 Learning Assistance with AI bot, Enables offline content
            access for low-connectivity areas.
          </p>
          <div className="w-[40px] h-[40px] mt-2">
            <img src={Arrow} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page2;

