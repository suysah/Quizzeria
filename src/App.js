import React, { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import Progress from "./Components/Progress";
import FinishedScreen from "./Components/FinishedScreen";
import Footer from "./Components/Footer";
import NextButton from "./Components/NextButton";
import Timer from "./Components/Timer";
import ViewSubmissions from "./Components/ViewSubmissions";
import SelectSubject from "./Components/SelectSubject";

const initialState = {
  questions: [],
  answerArray: [1, 3, 2, 0, 1],
  // loading,error,ready,active,finished
  status: "Start",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
  subject: null,
};

const SEc_PER_QUESTION = 30;
const BASE_URL = "https://quizzeria.onrender.com";
// const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "subjectSelected":
      return { ...state, subject: action.payload };
    case "Loading":
      return { ...state, status: "Loading" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return {
        ...state,
        status: "Active",
        timeRemaining: state.questions.length * SEc_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answerArray: [...state.answerArray, action.payload],
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "Finish":
      return {
        ...state,
        status: "Finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };

    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
      };

    case "Timer":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "Finished" : state.status,
      };

    case "ViewSubmissions":
      return { ...state, status: "ViewSubmissions" };
    default:
      return state;
  }
}

const App = () => {
  const [
    {
      questions,
      answerArray,
      status,
      index,
      answer,
      points,
      highScore,
      timeRemaining,
      subject,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(
    function () {
      async function fetchQuestion() {
        try {
          dispatch({ type: "Loading" });
          const res = await fetch(`${BASE_URL}/${subject}`);
          if (!res.ok) {
            throw new Error("error while fetching data");
          }
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
          console.log(data);
        } catch (error) {
          dispatch({ type: "dataFailed" });
          console.log(error.message);
        }
      }
      if (subject !== null) {
        fetchQuestion();
      }
    },
    [subject]
  );

  return (
    <div className="app">
      <Header />
      {status === "Start" && <SelectSubject dispatch={dispatch} />}
      <Main>
        {status === "Loading" && <Loader />}
        {subject !== null ? status === "Error" && <Error /> : null}
        {status === "Ready" && (
          <StartScreen
            subject={subject}
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "Active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === "Finished" && (
          <FinishedScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}

        {status === "ViewSubmissions" && (
          <ViewSubmissions
            answerArray={answerArray}
            question={questions}
            dispatch={dispatch}
            answer={answer}
            numQuestions={numQuestions}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
