import React, { useState } from "react";
import { useQuizContext } from "../context/QuizContext";

const ViewSubmissions = () => {
  const { questions, answerArray, numQuestions, dispatch } = useQuizContext();

  const [queIndex, setQuestionIndex] = useState(0);
  console.log(queIndex);

  function handleNext() {
    setQuestionIndex((queIndex) =>
      queIndex < numQuestions - 1 ? queIndex + 1 : numQuestions - 1
    );
  }
  function handlePrev() {
    setQuestionIndex((queIndex) => (queIndex > 0 ? queIndex - 1 : 0));
  }

  function handleBack() {
    dispatch({ type: "Finish" });
  }

  // ${index === answerArray[queIndex] ? "correct" : ""}

  let choosen = answerArray[queIndex];
  const correct = questions[queIndex].correctOption;
  if (choosen === correct) choosen = null;

  return (
    <div>
      <div className="prev-next-btn">
        <button className="btn bbtn-ui back-btn" onClick={handleBack}>
          &larr;
        </button>
        <p>
          Questions: <strong>{queIndex + 1}</strong>/{numQuestions}{" "}
        </p>
      </div>
      <h4> {questions[queIndex].question} </h4>
      <div className="options">
        {questions[queIndex].options.map((op, index) => (
          <button
            className={`btn btn-option 
              
            ${index === correct ? "answer correct" : ""}
            ${index === choosen ? "  wrong" : ""}  
            `}
            key={op}
          >
            {op}
          </button>
        ))}
      </div>
      <div className="prev-next-btn">
        <button className="btn bbtn-ui" onClick={handlePrev}>
          {" "}
          Prev
        </button>
        <button className="btn bbtn-ui" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewSubmissions;
