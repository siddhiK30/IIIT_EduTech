import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import './App.css';

const Quiz = () => {
  // State Management
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Gemini API Configuration
  const GEMINI_API_ENDPOINT = 'http://127.0.0.1:8000/quiz/generate-question';

  // Difficulty Levels
  const DIFFICULTY_LEVELS = [
    { value: 'easy', label: '🟢 Easy', color: 'green' },
    { value: 'medium', label: '🟡 Medium', color: 'orange' },
    { value: 'hard', label: '🔴 Hard', color: 'red' }
  ];

  // Fetch Questions from Backend
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const questionPromises = Array(10).fill().map(() => 
        axios.get(GEMINI_API_ENDPOINT, {
          params: { difficulty }
        })
      );

      const questionResponses = await Promise.all(questionPromises);
      const fetchedQuestions = questionResponses.map(response => response.data);
      
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  }, [difficulty]);

  // Lifecycle Hook for Question Fetching
  useEffect(() => {
    fetchQuestions();
  }, [difficulty, fetchQuestions]);

  // Answer Selection Handler
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Submit Answer Handler
  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answer is correct
    if (selectedOption === currentQuestion.correct_option) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart Quiz
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    fetchQuestions();
  };

  // Difficulty Adjustment Logic
  const adjustDifficulty = () => {
    switch (true) {
      case score < 3:
        return 'easy';
      case score < 7:
        return 'medium';
      default:
        return 'hard';
    }
  };

  // Render Methods
  const renderDifficultySelector = () => (
    <div className="difficulty-selector">
      {DIFFICULTY_LEVELS.map(level => (
        <button
          key={level.value}
          onClick={() => setDifficulty(level.value)}
          className={difficulty === level.value ? 'active' : ''}
          style={{ borderColor: level.color }}
        >
          {level.label}
        </button>
      ))}
    </div>
  );

  const renderQuestionCard = () => {
    if (loading || questions.length === 0) {
      return <div className="loading">Loading Questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="question-card">
        <div className="question-header">
          <span className="difficulty-badge">
            {DIFFICULTY_LEVELS.find(d => d.value === difficulty)?.label}
          </span>
          <span className="score">Score: {score}</span>
        </div>

        <h2>{currentQuestion.text}</h2>

        <div className="options-container">
          {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
            <button
              key={optionKey}
              onClick={() => handleOptionSelect(currentQuestion[optionKey])}
              className={`option ${
                selectedOption === currentQuestion[optionKey] ? 'selected' : ''
              }`}
            >
              {currentQuestion[optionKey]}
            </button>
          ))}
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmitAnswer}
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      </div>
    );
  };

  const renderQuizCompletedScreen = () => (
    <div className="quiz-completed">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {questions.length}</p>
      
      <div className="performance-analysis">
        {score <= 3 && "Keep practicing! You're improving."}
        {score > 3 && score <= 7 && "Good job! You're getting better."}
        {score > 7 && "Excellent performance! You're a quiz master!"}
      </div>

      <div className="actions">
        <button onClick={restartQuiz}>Restart Quiz</button>
        <button onClick={() => setDifficulty(adjustDifficulty())}>
          Adjust Difficulty
        </button>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="quiz-app">
      <div className="container">
        <h1>Gemini Quiz Generator</h1>
        
        {!quizCompleted ? (
          <>
            {renderDifficultySelector()}
            {renderQuestionCard()}
          </>
        ) : (
          renderQuizCompletedScreen()
        )}
      </div>
    </div>
  );
};

export default Quiz;

// Accompanying CSS (App.css)

