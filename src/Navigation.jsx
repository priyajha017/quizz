import { useStateContext } from "./StateContext";

// This component represents the navigation buttons for quiz questions.
function Navigation() {
  // Access necessary state and functions from the context.
  const { questions, visitedQuestions, currentQuestionIndex, handleNavigation, attemptedQuestions } = useStateContext();

  return (
    <div className="navigation">
      {/* Map through each question to create navigation buttons */}
      {questions.map((_, index) => {
        // Determine the CSS class for the button based on question status

        // Default to grey for unvisited questions.
        let buttonClass = 'default';

        // Highlight the button if it corresponds to the current question.
        if (index === currentQuestionIndex) {
          buttonClass = 'current';
        }
        // Use green for questions that have been attempted.
        else if (attemptedQuestions[index]) {
          buttonClass = 'attempted';
        }
        // Use yellow for visited but unattempted questions.
        else if (visitedQuestions[index]) {
          buttonClass = 'visited';
        }

        return (
          // Create a button element for each question.
          <button
            key={index}
            className={buttonClass}
            onClick={() => handleNavigation(index)}
          >
            {index + 1} {/* Display question number */}
          </button>
        );
      })}
    </div>
  );
}

export default Navigation;
