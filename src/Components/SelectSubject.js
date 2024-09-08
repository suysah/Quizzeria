import React from "react";
import Button from "./Button";
import { useQuizContext } from "../context/QuizContext";

const SelectSubject = () => {
  const { dispatch } = useQuizContext();

  return (
    <div className="select-subject-container">
      <div className="subject-div">
        <Button dispatch={dispatch} imgURL="../reactsvg.svg" payload="react" />
        <p>React</p>
      </div>
      <div className="subject-div">
        <Button dispatch={dispatch} imgURL="../js.svg" payload="javaScript" />
        <p>javaScript</p>
      </div>
      <div className="subject-div">
        <Button dispatch={dispatch} imgURL="../python.svg" payload="python" />
        <p>Pyhton</p>
      </div>
      <div className="subject-div">
        <Button dispatch={dispatch} imgURL="../c++.png" payload="c++" />
        <p>C++</p>
      </div>
      <div className="subject-div">
        <Button dispatch={dispatch} imgURL="../java.png" payload="java" />
        <p>Java</p>
      </div>
    </div>
  );
};

export default SelectSubject;
