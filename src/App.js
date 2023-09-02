import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import StartPage from './StartPage';
import Report from './Report';
import ConfirmationModal from './ConfirmationModal';
import Quiz from './Quiz';
import { StateProvider, useStateContext } from './StateContext';

// The main App component
function App() {
  return (
    // Wrap the entire app with the ThemeProvider
    <ThemeProvider>
      {/* Wrap the entire app with the StateProvider */}
      <StateProvider>
        {/* Render the AppContent component */}
        <AppContent />
      </StateProvider>
    </ThemeProvider>
  );
}

// AppContent component that uses context
function AppContent() {
  // Access context values using the useStateContext hook
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    quizStarted,
    isModalOpen,
    unattemptedQuestionsCount,
    openModal,
    closeModal,
    handleTryIt,
    handleSubmitAnyway,
    quizSubmitted
  } = useStateContext();

  return (
    <>
      {/* Render the Header component */}
      <Header />
      {/* Conditionally render components based on app state */}
      {!quizStarted ? (
        <StartPage />
      ) : questions.length === 0 ? (
        <div className='loading'>Loading...</div>
      ) : currentQuestionIndex === questions.length ? (
        <Report />
      ) : (
        <Quiz />
      )}
      {/* Render the ConfirmationModal when isModalOpen is true */}
      {isModalOpen && (
        <ConfirmationModal
          unattemptedQuestionsCount={unattemptedQuestionsCount}
          onCancel={closeModal}
          onTryIt={handleTryIt}
          onSubmitAnyway={handleSubmitAnyway}
        />
      )}
    </>
  );
}

export default App;
