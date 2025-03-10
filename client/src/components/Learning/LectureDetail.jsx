// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const lectures = [
//   { id: 1, title: 'Introduction to React', uploadedDate: '2025-02-10', video: '/videos/react-intro.mp4' },
//   { id: 2, title: 'Understanding Tailwind CSS', uploadedDate: '2025-02-11', video: '/videos/tailwind-css.mp4' },
//   { id: 3, title: 'React + Django Integration', uploadedDate: '2025-02-12', video: '/videos/react-django.mp4' },
//   { id: 4, title: 'Building a Quiz App', uploadedDate: '2025-02-13', video: '/videos/quiz-app.mp4' },
//   { id: 5, title: 'Dynamic Content with GenAI', uploadedDate: '2025-02-14', video: '/videos/genai-content.mp4' },
// ];

// const LectureDetailPage = () => {
//   const { id } = useParams();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const lecture = lectures.find((lec) => lec.id === parseInt(id));

//   if (!lecture) {
//     return <p className="p-6 text-red-500">Lecture not found.</p>;
//   }

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const summarise = () => {
//     if (selectedFile) {
//       console.log(`Summarizing file: ${selectedFile.name}`);
//       // Add logic for summarizing the uploaded file here
//     } else {
//       alert('Please upload a file first!');
//     }
//   };

//   return (
//     <div className="px-15 py-6">
//       <h1 className="text-3xl font-bold mb-4">{lecture.title}</h1>
//       <p className="text-gray-500 mb-2">Uploaded on: {lecture.uploadedDate}</p>
//       <div className="flex justify-between">
//         <div className="w-[50vw] h-[60vh] bg-gray-200 mb-4">
//           <video controls className="w-full h-full rounded-lg">
//             <source src={lecture.video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         <div className="w-[40vw] border border-gray-400 rounded-4xl p-4">
//           <div className="p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b"> <h1 className="text-xl font-bold">Download Notes</h1> <div className="w-6 h-6 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" > <path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z" /> </svg> </div> </div>


//           <button onClick={summarise} className="p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b mt-5">
//             <h1 className="text-xl font-bold">Summarise Lecture</h1>
//             <div className="w-6 h-6 flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z"></path></svg>
//             </div>
//           </button>

//           <div className="px-2 py-5">
//             <h1 className="text-xl font-bold">Summary:</h1>
//             {/* <p>
//               {selectedFile ? `File ready for summary: ${selectedFile.name}` : 'No file uploaded yet.'}
//             </p> */}
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quis eum tempora et, sit illum dicta maxime natus tenetur provident itaque perferendis, earum beatae repellendus aperiam ea expedita eligendi fugit blanditiis praesentium at porro amet perspiciatis? Sapiente corporis suscipit numquam odit ipsa dignissimos voluptatum, non iusto ut tempore recusandae cum nostrum odio veniam eaque doloremque atque deleniti eligendi saepe tempora eius. Praesentium, numquam iure exercitationem dignissimos doloribus amet et expedita temporibus magn
//             </p>
//           </div>
//         </div>
//       </div>

//       <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-5" onClick={() => window.history.back()}>
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default LectureDetailPage;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const LectureDetailPage = () => {
//   const { id } = useParams();
//   const [lecture, setLecture] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [summarizing, setSummarizing] = useState(false);


//   useEffect(() => {
//     fetchLectureDetails();
//   }, [id]);

//   const fetchLectureDetails = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/resources/${id}/`);
//       console.log(response)
//       setLecture(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching lecture details:', err);
//       setError('Failed to load lecture details');
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (fileType, fileName) => {
//     try {
//       const response = await axios({
//         url: `http://127.0.0.1:8000/resources/${id}/download_${fileType}/`,
//         method: 'GET',
//         responseType: 'blob', // Important for handling files
//       });

//       // Create a blob from the response
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);

//       // Create temporary link and trigger download
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Download error:', error);
//       alert('Failed to download file');
//     }
//   };

//   const summarise = async () => {
//     try {
//       setSummarizing(true);
//       // Correct URL format
//       const response = await axios.post(
//         `http://127.0.0.1:8000/resources/${id}/summarize/`  // Remove the extra '1/'
//       );

//       console.log('Summary response:', response.data); // Debug log

//       if (response.data.status === 'success') {
//         setSummary(response.data.summary);
//       } else {
//         throw new Error(response.data.error || 'Failed to generate summary');
//       }
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       alert(error.response?.data?.error || 'Failed to generate summary');
//     } finally {
//       setSummarizing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error || !lecture) {
//     return <p className="p-6 text-red-500">{error || 'Lecture not found.'}</p>;
//   }

//   const getVideoUrl = (videoPath) => {
//     if (!videoPath) return null;
//     // If the path is already a full URL, return it
//     if (videoPath.startsWith('http')) return videoPath;
//     // Otherwise, construct the full URL
//     return `http://localhost:8000${videoPath}`;
//   };


//   return (
//     <div className="px-15 py-6">
//       <h1 className="text-3xl font-bold mb-4">{lecture.title}</h1>
//       <p className="text-gray-500 mb-2">
//         Uploaded on: {new Date(lecture.created_at).toLocaleDateString()}
//       </p>

//       <div className="flex justify-between">
//         <div className="w-[50vw] h-[60vh] bg-gray-200 mb-4 rounded-lg overflow-hidden">
//           {lecture?.lecture ? (
//             <video
//               key={getVideoUrl(lecture.lecture)} // Add key to force re-render when source changes
//               controls
//               className="w-full h-full object-contain"
//               preload="metadata"
//               controlsList="nodownload" // Optional: prevent download
//             >
//               <source
//                 src={getVideoUrl(lecture.lecture)}
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-500">
//               No video available
//             </div>
//           )}
//         </div>

//         <div className="w-[40vw] border border-gray-400 rounded-4xl p-4">
//           {/* Download buttons for both files */}
//           {lecture?.file1 && (
//             <button
//               onClick={() => handleDownload('file1', `${lecture.title}_resource1.pdf`)}
//               className="p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b mb-3"
//             >
//               <h1 className="text-xl font-bold">Download Notes 1</h1>
//               <div className="w-6 h-6 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z" />
//                 </svg>
//               </div>
//             </button>
//           )}

        

//           <button
//             onClick={summarise}
//             disabled={summarizing}
//             className={`p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b mt-5 ${summarizing ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//           >
//             <h1 className="text-xl font-bold">
//               {summarizing ? 'Summarizing...' : 'Summarise Lecture'}
//             </h1>
//             <div className="w-6 h-6 flex items-center justify-center">
//               {summarizing ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z"></path>
//                 </svg>
//               )}
//             </div>
//           </button>

//           {/* Summary section */}
//           <div className="px-2 py-5">
//             <h1 className="text-xl font-bold">Summary:</h1>
//             {summarizing ? (
//               <div className="mt-3 text-gray-500">Generating summary...</div>
//             ) : (
//               <p className="mt-3 text-gray-700">
//                 {summary || 'Click "Summarise Lecture" to generate a summary.'}
//               </p>
//             )}
//           </div>

         
//         </div>
//       </div>

//       <button
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-5"
//         onClick={() => window.history.back()}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default LectureDetailPage;





import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Download, ArrowLeft, FileText, RefreshCw, AlertTriangle } from 'lucide-react';

const API_URL = "https://detect.roboflow.com/driver-fatigue/2";
const API_KEY = "963hJ2hzap5b1YqukTuE";
const ALERT_COOLDOWN = 10000; // 10 seconds in milliseconds

const LectureDetailPage = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  
  // Fatigue detection states
  const [isVisible, setIsVisible] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('Awake');
  const [showAlert, setShowAlert] = useState(false);
  const videoRef = useRef(null);
  const lastAlertTimeRef = useRef(0);
  const fatigueVideoRef = useRef(null);

  useEffect(() => {
    fetchLectureDetails();
  }, [id]);

  // Fatigue detection functions
  const speakAlert = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const detectFatigue = async () => {
    if (!fatigueVideoRef.current) return;

    const video = fatigueVideoRef.current;
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
              speakAlert("You seem tired. Please take a break and freshen up.");
              lastAlertTimeRef.current = currentTime;
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

  // Initialize fatigue detection
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (fatigueVideoRef.current) {
          fatigueVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();
    const timer = setTimeout(() => setIsVisible(true), 100);
    const detectionInterval = setInterval(detectFatigue, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(detectionInterval);
      if (fatigueVideoRef.current?.srcObject) {
        fatigueVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Existing functions
  const fetchLectureDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/resources/${id}/`);
      setLecture(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching lecture details:', err);
      setError('Failed to load lecture details');
      setLoading(false);
    }
  };

  const handleDownload = async (fileType, fileName) => {
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/resources/${id}/download_${fileType}/`,
        method: 'GET',
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  const summarise = async () => {
    try {
      setSummarizing(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/resources/${id}/summarize/`
      );

      if (response.data.status === 'success') {
        setSummary(response.data.summary);
      } else {
        throw new Error(response.data.error || 'Failed to generate summary');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      alert(error.response?.data?.error || 'Failed to generate summary');
    } finally {
      setSummarizing(false);
    }
  };

  const getVideoUrl = (videoPath) => {
    if (!videoPath) return null;
    return videoPath.startsWith('http') ? videoPath : `http://localhost:8000${videoPath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !lecture) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-xl text-red-500 font-medium mb-4">{error || 'Lecture not found.'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 group"
        >
          <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Lectures</span>
        </button>

        {/* Fatigue Detection Alert */}
        {showAlert && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center">
              <AlertTriangle className="mr-2" />
              <span className="font-medium">You seem tired. Please take a break and freshen up.</span>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{lecture.title}</h1>
            <p className="text-gray-500">
              Uploaded on: {new Date(lecture.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 p-6">
            {/* Video Section */}
            <div className="lg:w-3/5">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                {lecture?.lecture ? (
                  <video
                    key={getVideoUrl(lecture.lecture)}
                    controls
                    className="w-full aspect-video"
                    preload="metadata"
                    controlsList="nodownload"
                    ref={videoRef}
                  >
                    <source src={getVideoUrl(lecture.lecture)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center text-gray-400">
                    No video available
                  </div>
                )}
              </div>
            </div>

            {/* Resources Section */}
            <div className="lg:w-2/5 space-y-6">
              {/* Hidden fatigue detection video */}
              <video
                ref={fatigueVideoRef}
                autoPlay
                playsInline
                className="hidden"
              />

              <div className="bg-blue-50 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resources</h2>
                {lecture?.file1 && (
                  <button
                    onClick={() => handleDownload('file1', `${lecture.title}_resource1.pdf`)}
                    className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-between shadow-sm mb-3"
                  >
                    <div className="flex items-center">
                      <FileText className="mr-3 text-blue-600" />
                      <span className="font-medium">Lecture Notes</span>
                    </div>
                    <Download className="text-blue-600" />
                  </button>
                )}

                <button
                  onClick={summarise}
                  disabled={summarizing}
                  className={`w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-between shadow-md ${
                    summarizing ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="font-medium">
                    {summarizing ? 'Generating Summary...' : 'Generate Summary'}
                  </span>
                  {summarizing ? (
                    <RefreshCw className="animate-spin" />
                  ) : (
                    <RefreshCw />
                  )}
                </button>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Lecture Summary</h2>
                {summarizing ? (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <RefreshCw className="animate-spin mr-2" />
                    <span>Generating summary...</span>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-gray-600">
                      {summary || 'Click "Generate Summary" to create a summary of this lecture.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;