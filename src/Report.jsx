import React from "react";
import { useStateContext } from "./StateContext";

function Report() {
  // Access context values to calculate and display quiz report
  const { unattemptedQuestionsCount, questions, userAnswers } = useStateContext();

  // Calculate the number of correct answers
  const correctAnswers = questions.reduce((count, question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);

  // Calculate the number of incorrect answers
  const incorrectAnswers = questions.length - correctAnswers;

  return (
    <div className="report">
      <div className="report-title">Quiz Report</div>
      <div className="detailed-report">
        {questions.map((question, index) => (
          <div key={index} className="question-report">
            <p>
              {index + 1}. {question.question}
            </p>
            <p>
              Your Answer:{" "}
              <span
                className={
                  userAnswers[index] === undefined
                    ? "unattempted-answer"
                    : question.correctAnswer === userAnswers[index]
                    ? "correct-answer"
                    : "incorrect-answer"
                }
              >
                &nbsp;
                {userAnswers[index] !== undefined ? userAnswers[index] : "Null"}
                &nbsp;
              </span>
            </p>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        ))}
        <div className="summary">
          <div className="summary-subdiv">
            Total Questions: {questions.length}
          </div>
          <div className="summary-subdiv">
            Unattempted Questions: {unattemptedQuestionsCount}
          </div>
        </div>
        <div className="summary">
          <div className="summary-subdiv">
            Correct Answers: {correctAnswers}
          </div>
          <div className="summary-subdiv">
            Incorrect Answers: {incorrectAnswers}
          </div>
        </div>
        <div className="report-score">
          Score: {((correctAnswers / questions.length) * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

export default Report;
