import React from "react";
import { useQuizContext } from "../context/QuizContext";

const StartScreen = () => {
  const { numQuestions, dispatch, subject } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to the {subject} Quiz!</h2>
      <h3>
        {numQuestions} Question to test your {subject} mastery
      </h3>
      <div className="start-screen-btn">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's Start
        </button>

        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "Restart" })}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
