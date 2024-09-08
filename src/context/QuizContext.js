import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  answerArray: [],
  status: "Start",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
  subject: null,
  themeDark: true,
};

const SEc_PER_QUESTION = 30;
const BASE_URL = "https://quizzeria.onrender.com";

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
    case "colorTheme":
      return { ...state, themeDark: !state.themeDark };
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

function ContextProvider({ children }) {
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
      themeDark,
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

  useEffect(
    function () {
      document.body.className = themeDark ? "dark" : "light";
    },
    [themeDark]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        answerArray,
        status,
        index,
        answer,
        points,
        highScore,
        timeRemaining,
        subject,
        themeDark,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("context was used before provider");
  }
  return context;
}

export { ContextProvider, useQuizContext };
