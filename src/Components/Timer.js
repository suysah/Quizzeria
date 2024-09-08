import React, { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";

const Timer = () => {
  const { timeRemaining, dispatch } = useQuizContext();

  const mins = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "Timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
