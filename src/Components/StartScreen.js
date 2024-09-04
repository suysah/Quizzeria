import React from "react";

const StartScreen = ({ numQuestions, dispatch, subject }) => {
  return (
    <div className="start">
      <h2>Welcome to the {subject} Quiz!</h2>
      <h3>
        {numQuestions} Question to test your {subject} mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
