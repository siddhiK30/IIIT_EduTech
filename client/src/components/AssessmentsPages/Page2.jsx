// QuizPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const QuizPage = () => {
  const [quizState, setQuizState] = useState({
    currentQuestion: null,
    score: 0,
    questionNumber: 0,
    totalQuestions: 30,
    difficulty: 'easy',
    streak: 0,
    isCompleted: false,
    loading: true,
    error: null
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState(null);

  // Function to get CSRF token
  const getCSRFToken = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/mcq/question/');
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const fetchQuestion = async () => {
    try {
      setQuizState(prev => ({ ...prev, loading: true }));
      const response = await axios.get('http://127.0.0.1:8000/mcq/question/', {
        withCredentials: true
      });

      console.log('Fetch question response:', response.data); // Debug log

      if (response.data.completed) {
        setQuizState(prev => ({
          ...prev,
          isCompleted: true,
          score: response.data.final_score,
          loading: false
        }));
        return;
      }

      setQuizState(prev => ({
        ...prev,
        currentQuestion: response.data.question,
        questionNumber: response.data.quiz_progress.current_question,
        score: response.data.quiz_progress.score,
        difficulty: response.data.quiz_progress.difficulty,
        streak: response.data.quiz_progress.streak,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching question:', error);
      setQuizState(prev => ({
        ...prev,
        error: 'Failed to fetch question',
        loading: false
      }));
    }
  };


  const fetchStats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/mcq/stats/');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const initializeQuiz = async () => {
      await getCSRFToken();
      await fetchQuestion();
      await fetchStats();
    };
    initializeQuiz();
  }, []);

  const handleSubmit = async () => {
    if (!selectedOption || !quizState.currentQuestion) return;

    try {
      console.log('Submitting answer:', {
        question_id: quizState.currentQuestion.id,
        selected_option: selectedOption
      });

      const response = await axios.post('http://127.0.0.1:8000/mcq/submit-answer/', {
        question_id: quizState.currentQuestion.id,
        selected_option: selectedOption
      }, {
        withCredentials: true
      });

      console.log('Submit response:', response.data); // Debug log

      const { answer_result, quiz_progress } = response.data;

      // Update current state immediately
      setQuizState(prev => ({
        ...prev,
        score: quiz_progress.current_score,
        questionNumber: quiz_progress.questions_answered
      }));

      setFeedback({
        isCorrect: answer_result.is_correct,
        correctAnswer: answer_result.correct_answer,
        scoreChange: answer_result.score_change,
        streak: answer_result.streak
      });

      // Wait for feedback to be shown
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear feedback
      setFeedback(null);

      // Reset selected option
      setSelectedOption('');

      if (quiz_progress.is_completed) {
        setQuizState(prev => ({
          ...prev,
          isCompleted: true,
          score: quiz_progress.current_score
        }));
      } else {
        // Fetch next question
        await fetchQuestion();
      }

    } catch (error) {
      console.error('Submit error:', error);
      setQuizState(prev => ({
        ...prev,
        error: 'Failed to submit answer'
      }));
    }
  };

  const handleReset = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/mcq/reset/');
      setSelectedOption('');
      setFeedback(null);
      setStats(null);
      fetchQuestion();
    } catch (error) {
      console.error('Error resetting quiz:', error);
    }
  };

  if (quizState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Quiz Completed! 🎉</h2>
          <div className="space-y-4">
            <p className="text-2xl">Final Score: <span className="font-bold text-blue-600">{quizState.score}</span></p>
            {stats && (
              <div className="mt-6 space-y-2 text-left">
                <p>Questions Answered: {stats.questions_answered}/{stats.total_questions}</p>
                <p>Average Score: {stats.average_score.toFixed(2)} points per question</p>
                <p>Progress: {stats.progress_percentage.toFixed(1)}%</p>
              </div>
            )}
          </div>
          <button
            onClick={handleReset}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Question</p>
              <p className="text-lg font-semibold">{quizState.questionNumber}/{quizState.totalQuestions}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Score</p>
              <p className="text-lg font-semibold text-blue-600">{quizState.score}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Streak</p>
              <p className="text-lg font-semibold text-orange-500">
                {quizState.streak} {quizState.streak >= 3 && '🔥'}
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {quizState.currentQuestion && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {quizState.currentQuestion.text}
              </h2>
              <div className="space-y-3">
                {quizState.currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    disabled={feedback !== null} // Disable during feedback
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200
                    ${selectedOption === option
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Feedback Message */}
          {feedback && (
            <div className={`mt-4 p-4 rounded-lg text-center animate-fade-in
            ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-medium">
                {feedback.isCorrect ? (
                  <>
                    Correct! +{feedback.scoreChange} points
                    {feedback.streak >= 3 && ' (Streak Bonus! 🔥)'}
                  </>
                ) : (
                  <>
                    Incorrect. The correct answer was: {feedback.correctAnswer}
                    {feedback.scoreChange < 0 && ` (${feedback.scoreChange} points)`}
                  </>
                )}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!selectedOption || feedback !== null}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;