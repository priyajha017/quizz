import React from 'react';
import { useStateContext } from './StateContext'; // Import the custom context hook
import Question from './Question';
import Navigation from './Navigation';

// This component represents the main quiz page.
const Quiz = () => {
  // Destructure values from the context
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    visitedQuestions,
    attemptedQuestions,
    handleAnswerSelect,
    handlePrevQuestion,
    handleNextQuestion,
    handleNavigation,
    setIsModalOpen,
    timer,
  } = useStateContext();
  

  return (
    <div className="app">
      <div className='main-page'>
        {/* Display the navigation for questions */}
        <Navigation />
        {/* Display the current question */}
        <Question
          questionNumber={currentQuestionIndex}
          question={questions[currentQuestionIndex]?.question}
          choices={questions[currentQuestionIndex]?.choices}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onSelect={handleAnswerSelect}
        />
        <div className="button-group">
          {/* Show 'Previous' button if not on the first question */}
          {currentQuestionIndex > 0 && (
            <button onClick={handlePrevQuestion} className='button-previous'>Previous</button>
          )}
          {/* Show 'Next' or 'Submit' button based on the current question */}
          {currentQuestionIndex < questions.length - 1 ? (
            <button onClick={handleNextQuestion} className='button-next'>Next</button>
          ) : (
            <button onClick={handleNextQuestion} className='button-submit'>Submit</button>
          )}
        </div>
        {/* Display the timer */}
        <div className="timer">Time left: {Math.floor(timer / 60)}:{timer % 60}</div>
      </div>
    </div>
  );
}

export default Quiz;
