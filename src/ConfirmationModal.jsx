import React, { useEffect } from 'react';

function ConfirmationModal({ unattemptedQuestionsCount, onCancel, onTryIt, onSubmitAnyway }) {
  // Function to close the modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (!document.querySelector('.modal').contains(event.target)) {
      onCancel();
    }
  };

  // Add an event listener to detect clicks outside the modal
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Display the unattempted questions count */}
        <div className='modal-title'>You have {unattemptedQuestionsCount} unattempted questions.</div>
        <p className='modal-subtitle'>Do you want to try them or submit anyway?</p>
        <div className="modal-buttons">
          {/* Button to attempt the unattempted questions */}
          <button onClick={onTryIt}>Try It</button>
          {/* Button to submit the quiz anyway */}
          <button onClick={onSubmitAnyway}>Submit Anyway</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
