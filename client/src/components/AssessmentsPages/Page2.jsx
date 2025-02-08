import React, { useState } from 'react';

const Page2 = ({ setActivePage }) => {
  const questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctAnswer: 'Mars',
    },
    {
      id: 3,
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
      correctAnswer: 'William Shakespeare',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Redirect to Page1 (Progress Reports)
      setActivePage('Page1');
    }
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Quiz Page</h2>
      <div className="mb-6">
        <div className="text-lg font-semibold">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <p className="mt-2 text-gray-700">{questions[currentQuestion].question}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`p-3 border rounded-lg text-left ${
              selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          Score: <span className="font-bold">{score}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleNext}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Page2;
