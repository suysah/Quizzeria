import React from "react";
import { useQuizContext } from "../context/QuizContext";

const Questions = () => {
  const { questions, index, dispatch, answer } = useQuizContext();
  const question = questions[index];
  return (
    <div>
      <h4> {question.question} </h4>
      <div className="options">
        {question.options.map((op, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}  
            ${
              answer !== null &&
              (index === question.correctOption ? "correct" : "wrong")
            } `}
            key={op}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={answer !== null}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
