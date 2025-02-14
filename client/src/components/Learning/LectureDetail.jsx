import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const lectures = [
  { id: 1, title: 'Introduction to React', uploadedDate: '2025-02-10', video: '/videos/react-intro.mp4' },
  { id: 2, title: 'Understanding Tailwind CSS', uploadedDate: '2025-02-11', video: '/videos/tailwind-css.mp4' },
  { id: 3, title: 'React + Django Integration', uploadedDate: '2025-02-12', video: '/videos/react-django.mp4' },
  { id: 4, title: 'Building a Quiz App', uploadedDate: '2025-02-13', video: '/videos/quiz-app.mp4' },
  { id: 5, title: 'Dynamic Content with GenAI', uploadedDate: '2025-02-14', video: '/videos/genai-content.mp4' },
];

const LectureDetailPage = () => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const lecture = lectures.find((lec) => lec.id === parseInt(id));

  if (!lecture) {
    return <p className="p-6 text-red-500">Lecture not found.</p>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const summarise = () => {
    if (selectedFile) {
      console.log(`Summarizing file: ${selectedFile.name}`);
      // Add logic for summarizing the uploaded file here
    } else {
      alert('Please upload a file first!');
    }
  };

  return (
    <div className="px-15 py-6">
      <h1 className="text-3xl font-bold mb-4">{lecture.title}</h1>
      <p className="text-gray-500 mb-2">Uploaded on: {lecture.uploadedDate}</p>
      <div className="flex justify-between">
        <div className="w-[50vw] h-[60vh] bg-gray-200 mb-4">
          <video controls className="w-full h-full rounded-lg">
            <source src={lecture.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="w-[40vw] border border-gray-400 rounded-4xl p-4">
          <div className="p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b"> <h1 className="text-xl font-bold">Download Notes</h1> <div className="w-6 h-6 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" > <path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z" /> </svg> </div> </div>
          <div className="mb-5 mx-2 mt-2">
            <label htmlFor="fileInput" className="block text-lg font-bold mb-2">
              Upload PDF for Summary:
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-[250px] px-4 py-2 border border-gray-600 rounded-lg focus:outline-none"
            />
          </div>

          <button onClick={summarise} className="p-4 bg-gray-400 w-[250px] h-[50px] rounded-full flex justify-between items-center border-b">
            <h1 className="text-xl font-bold">Summarise the PDF</h1>
            <div className="w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z"></path></svg>
            </div>
          </button>

          <div className="px-2 py-5">
            <h1 className="text-xl font-bold">Summary:</h1>
            {/* <p>
              {selectedFile ? `File ready for summary: ${selectedFile.name}` : 'No file uploaded yet.'}
            </p> */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quis eum tempora et, sit illum dicta maxime natus tenetur provident itaque perferendis, earum beatae repellendus aperiam ea expedita eligendi fugit blanditiis praesentium at porro amet perspiciatis? Sapiente corporis suscipit numquam odit ipsa dignissimos voluptatum, non iusto ut tempore recusandae cum nostrum odio veniam eaque doloremque atque deleniti eligendi saepe tempora eius. Praesentium, numquam iure exercitationem dignissimos doloribus amet et expedita temporibus magn
            </p>
          </div>
        </div>
      </div>

      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-5" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default LectureDetailPage;
