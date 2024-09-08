import React from "react";
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
import { FaSun, FaMoon } from "react-icons/fa";
import { useQuizContext } from "./context/QuizContext";

const App = () => {
  const { status, themeDark, subject, dispatch } = useQuizContext();

  return (
    <div className="app ">
      <Header>
        <button
          className="dark-light-toggle-btn"
          onClick={() => dispatch({ type: "colorTheme" })}
        >
          {themeDark ? <FaSun color="yellow" /> : <FaMoon />}
        </button>
      </Header>

      {status === "Start" && <SelectSubject />}
      <Main>
        {status === "Loading" && <Loader />}
        {subject !== null ? status === "Error" && <Error /> : null}
        {status === "Ready" && <StartScreen />}
        {status === "Active" && (
          <>
            <Progress />
            <Questions />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "Finished" && <FinishedScreen />}

        {status === "ViewSubmissions" && <ViewSubmissions />}
      </Main>
    </div>
  );
};

export default App;
