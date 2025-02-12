import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page2 = () => {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [quizFinished, setQuizFinished] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/mcq/question/');
      setQuestion(response.data);
      setScore(response.data.score);
      setCorrectStreak(response.data.correct_streak);
      setSelectedOption('');
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!selectedOption) return alert('Please select an option!');

    try {
      await axios.post('http://127.0.0.1:8000/mcq/submit-answer/', {
        question_id: question.id,
        selected_option: selectedOption,
      });

      if (questionNumber < 10) {
        setQuestionNumber(prev => prev + 1);
        fetchQuestion(); // Load the next question
      } else {
        setQuizFinished(true); 
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const resetQuiz = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/mcq/reset-quiz/');
      setQuestionNumber(1);
      setQuizFinished(false);
      fetchQuestion(); // Reload the first question
    } catch (error) {
      console.error('Error resetting quiz:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl font-bold p-10">Loading...</div>;
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6">Quiz Finished!</h1>
          <p className="text-lg">Your final score is: <span className="font-bold">{score}</span></p>
          <p className="text-lg">Correct Streak: <span className="font-bold">{correctStreak}</span></p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Quiz App</h1>

        {question ? (
          <div>
            <div className="flex justify-between mb-4">
              <p className="text-lg">Question: <span className="font-bold">{questionNumber}/10</span></p>
              <p className="text-lg">Difficulty: <span className="font-bold">{question.difficulty}</span></p>
            </div>

            <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={option}
                    className="mr-2"
                    onChange={() => setSelectedOption(option)}
                    checked={selectedOption === option}
                  />
                  <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
                </div>
              ))}
            </div>

            <button
              onClick={submitAnswer}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600"
            >
              Submit Answer
            </button>

            <div className="mt-8">
              <p className="text-lg">Score: <span className="font-bold">{score}</span></p>
              <p className="text-lg">Correct Streak: <span className="font-bold">{correctStreak}</span></p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg">No more questions available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;
