// import React, { useEffect, useState } from 'react'
// import NavBar from './NavBar'
// import Page1 from './LandingPages/Page1';
// import Page2 from './LandingPages/Page2';

// const Home = () => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//       // Trigger the animation by changing the state after the component mounts
//       const timer = setTimeout(() => setIsVisible(true), 100); // Small delay for smooth entry
//       return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className='h-full bg-[#dee0e0]'>
//         {/* <NavBar /> */}
//         <Page1/>
//         <Page2/>
//     </div>
//   )
// }

// export default Home
import React, { useEffect, useState, useRef } from 'react';
import NavBar from './NavBar';
import Page1 from './LandingPages/Page1';
import Page2 from './LandingPages/Page2';

const API_URL = "https://detect.roboflow.com/driver-fatigue/2";
const API_KEY = "7y9E0pW7t5IcONqrvdVn";
const ALERT_COOLDOWN = 10000; // 10 seconds in milliseconds

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('Awake');
  const [showAlert, setShowAlert] = useState(false);
  const videoRef = useRef(null);
  const lastAlertTimeRef = useRef(0);

  // Function to speak alerts
  const speakAlert = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  // Function to detect fatigue
  const detectFatigue = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      const formData = new FormData();
      formData.append('file', blob);

      const response = await fetch(`${API_URL}?api_key=${API_KEY}`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.predictions) {
        const currentTime = Date.now();

        for (const prediction of result.predictions) {
          if (prediction.class.toLowerCase().includes('drowsy')) {
            setDetectionStatus('Drowsy');

            if (currentTime - lastAlertTimeRef.current >= ALERT_COOLDOWN) {
              setShowAlert(true);
              speakAlert("Alert! You seem tired. Please take a break and freshen up for your safety.");
              lastAlertTimeRef.current = currentTime;

              // Hide alert after 10 seconds
              setTimeout(() => {
                setShowAlert(false);
              }, 10000);
            }
          } else {
            setDetectionStatus('Awake');
            setShowAlert(false);
          }
        }
      }
    } catch (error) {
      console.error("Error during fatigue detection:", error);
    }
  };

  // Initialize camera and start detection
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();

    // Animation delay
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Start detection interval
    const detectionInterval = setInterval(detectFatigue, 1000);

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearInterval(detectionInterval);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative">
      <NavBar />
      
      <div className="container mx-auto p-4">
        <video
          ref={videoRef}
          id="videoFeed"
          autoPlay
          playsInline
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
        />
        
        <div className={`mt-4 text-center ${
          detectionStatus === 'Drowsy' ? 'text-red-600' : 'text-green-600'
        }`}>
          <p className="text-lg font-bold">Status: {detectionStatus}</p>
        </div>
        
        {showAlert && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            You seem tired. Please take a break and freshen up .
          </div>
        )}
      </div>

      <Page1 />
      <Page2 />
    </div>
  );
};

export default Home;