import React from 'react';

// This component represents a single quiz question.
function Question({ questionNumber, question, choices, selectedAnswer, onSelect }) {
  return (
    <div className="questions">
      {/* Display the question number and text */}
      <div className='question'>{questionNumber + 1}. {question}</div>
      <div className='question-options'>
        {/* Map through choices and create radio input elements */}
        {choices?.map((choice, index) => (
          <label key={index} className='label'>
            <input
              type="radio"
              value={choice}
              // Check the input if it matches the selected answer
              checked={selectedAnswer === choice}
              // Call the onSelect function when the input is changed
              onChange={() => onSelect(choice)}
            />
            {choice} {/* Display the choice text */}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
