import React from "react";
import { useQuizContext } from "../context/QuizContext";

const NextButton = () => {
  const { dispatch, answer, numQuestions, index } = useQuizContext();

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
