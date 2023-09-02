// This function fetches quiz questions from an external API.
const fetchQuizQuestions = async () => {
  try {
    // Send a GET request to the API to retrieve 15 questions.
    const response = await fetch('https://opentdb.com/api.php?amount=15');

    // Check if the response status is not okay (e.g., not 200).
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    // Parse the response data as JSON.
    const data = await response.json();

    // Process the received questions data into a usable format.
    const processedQuestions = data.results.map((question) => ({
      question: question.question,
      choices: [question.correct_answer, ...question.incorrect_answers],
      correctAnswer: question.correct_answer,
    }));

    // Return the processed questions.
    return processedQuestions;
  } catch (error) {
    // Handle any errors that occur during the process.
    console.error(error);
    
    // Return an empty array to indicate failure.
    return [];
  }
};

// Export the fetchQuizQuestions function for use in other modules.
export default fetchQuizQuestions;
