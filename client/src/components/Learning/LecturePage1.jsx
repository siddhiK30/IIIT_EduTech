import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LecturePage1 = () => {
  const navigate = useNavigate();

  const {mentor_id}=useParams()
  console.log(mentor_id)

  // Demo JSON data for lectures
  const lectures = [
    {
      id: 1,
      title: 'Introduction to React',
      uploadedDate: '2025-02-10',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Understanding Tailwind CSS',
      uploadedDate: '2025-02-11',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'React + Django Integration',
      uploadedDate: '2025-02-12',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Building a Quiz App',
      uploadedDate: '2025-02-13',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: 'Dynamic Content with GenAI',
      uploadedDate: '2025-02-14',
      thumbnail: 'https://via.placeholder.com/150',
    },
  ];

  const handleWatchNow = (id) => {
    navigate(`/lecture/${id}`);
  };

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center">
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 w-[30vw] "
        >
          <img
            src={lecture.thumbnail}
            alt={lecture.title}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{lecture.title}</h2>
            <p className="text-gray-500 text-sm">Uploaded on: {lecture.uploadedDate}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleWatchNow(lecture.id)}
            >
              Watch Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LecturePage1;
