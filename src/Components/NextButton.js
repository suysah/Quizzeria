import React from "react";

const NextButton = ({ dispatch, answer, numQuestions, index }) => {
  if (index < numQuestions - 1)
    return (
      <div>
        {answer !== null ? (
          <button
            onClick={() =>
              dispatch({ type: "nextQuestion", payload: numQuestions })
            }
            className="btn btn-ui"
          >
            Next
          </button>
        ) : null}
      </div>
    );
  if (index === numQuestions - 1)
    return (
      <div>
        {answer !== null ? (
          <button
            onClick={() => dispatch({ type: "Finish" })}
            className="btn btn-ui"
          >
            Finish
          </button>
        ) : null}
      </div>
    );
};

export default NextButton;
