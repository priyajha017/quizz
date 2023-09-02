import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchQuizQuestions from './api';

// Create a context to manage the state
const StateContext = createContext();

// StateProvider component to provide state to children
export function StateProvider({ children }) {
  // State variables
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState({ 0: true }); // Initialize the first question as visited
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  // State variables for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unattemptedQuestionsCount, setUnattemptedQuestionsCount] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Fetch questions from an API when the component mounts
  useEffect(() => {
    async function fetchQuestions() {
      const quizQuestions = await fetchQuizQuestions();
      setQuestions(quizQuestions);
      setAttemptedQuestions(new Array(quizQuestions.length).fill(false));
    }
    fetchQuestions();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // Timer has reached zero, submit the quiz or take necessary action
      handleSubmitAnyway()
    }
  }, [timer]);

  // Modal open function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Modal close function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle "Try It" button click
  const handleTryIt = () => {
    closeModal();
    navigateToNextUnattemptedQuestion();
  };

  // Handle "Submit Anyway" button click
  const handleSubmitAnyway = () => {
    closeModal();
    setCurrentQuestionIndex(questions.length);
    setQuizSubmitted(true);
  };

  // Navigate to the next unattempted question
  const navigateToNextUnattemptedQuestion = () => {
    const nextUnattemptedIndex = attemptedQuestions.indexOf(false);
    if (nextUnattemptedIndex !== -1) {
      setCurrentQuestionIndex(nextUnattemptedIndex);
    }
  };

  // Handle navigation to a specific question
  const handleNavigation = (index) => {
    setCurrentQuestionIndex(index);

    setVisitedQuestions((prevVisited) => ({
      ...prevVisited,
      [index]: true,
    }));
  };

  // Handle user's answer selection
  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);

    setAttemptedQuestions((prevAttempted) => {
      const updatedAttempted = [...prevAttempted];
      updatedAttempted[currentQuestionIndex] = true;
      return updatedAttempted;
    });
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      const unattemptedCount = attemptedQuestions.filter((attempted) => !attempted).length;
      if (unattemptedCount > 0) {
        setUnattemptedQuestionsCount(unattemptedCount);
        openModal();
        return;
      }
    }

    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    setVisitedQuestions((prevVisited) => ({
      ...prevVisited,
      [nextIndex]: true,
    }));

    if (userAnswers[nextIndex] !== undefined) {
      setAttemptedQuestions((prevAttempted) => {
        const updatedAttempted = [...prevAttempted];
        updatedAttempted[nextIndex] = true;
        return updatedAttempted;
      });
    }
  };

  // Handle moving to the previous question
  const handlePrevQuestion = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      setVisitedQuestions((prevVisited) => ({
        ...prevVisited,
        [prevIndex]: true,
      }));
    }
  };

  // Context value to be provided to children
  const contextValue = {
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswers,
    visitedQuestions,
    setVisitedQuestions,
    attemptedQuestions,
    setAttemptedQuestions,
    timer,
    setTimer,
    quizStarted,
    setQuizStarted,
    isModalOpen,
    setIsModalOpen,
    unattemptedQuestionsCount,
    setUnattemptedQuestionsCount,
    openModal,
    closeModal,
    handleNavigation,
    handleAnswerSelect,
    handleNextQuestion,
    handlePrevQuestion,
    handleTryIt,
    handleSubmitAnyway,
    quizSubmitted,
    setQuizSubmitted,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

// Custom hook to access context
export function useStateContext() {
  return useContext(StateContext);
}
