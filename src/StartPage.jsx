import React, { useState } from "react";
import { useStateContext } from "./StateContext";

function StartPage() {
  // Access context values and functions
  const { setQuizStarted } = useStateContext();

  // State for user's email and email validation
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Function to handle quiz start button click
  const handleStart = () => {
    if (validateEmail(email)) {
      setIsValidEmail(true);
      setQuizStarted(email);
    } else {
      setIsValidEmail(false);
    }
  };

  // Function to validate email using a regex pattern
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="start-page">
      <div className="start-page-inp">
        <input
          className="start-page-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleStart} className="start-page-submit">
          Start Quiz
        </button>
      </div>
      {!isValidEmail && (
        <div className="start-page-error-message">Invalid email address</div>
      )}
    </div>
  );
}

export default StartPage;
