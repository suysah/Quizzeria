import React from "react";

const Button = ({ dispatch, imgURL, payload }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: "#343a40" }}
        onClick={() => dispatch({ type: "subjectSelected", payload })}
      >
        <img src={imgURL} alt={`${imgURL} icon`} />
      </button>
    </div>
  );
};

export default Button;
