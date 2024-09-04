import React from "react";

const FinishedScreen = ({ points, maxPossiblePoints, highScore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎊";
  if (percentage >= 60 && percentage < 80) emoji = "😊";
  if (percentage >= 30 && percentage < 60) emoji = "🥲";
  if (percentage >= 0 && percentage < 40) emoji = "💀";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong> {points}</strong> out of {maxPossiblePoints}{" "}
        ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">( Highscore: {highScore} points )</p>
      <div className="result-btn-alignment">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "Restart" })}
        >
          Restart
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "ViewSubmissions" })}
        >
          View Submissions
        </button>
      </div>
    </>
  );
};

export default FinishedScreen;
