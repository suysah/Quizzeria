import React from "react";

const Note = () => {
  return (
    <div>
      <div className="Note">
        <p style={{ fontSize: "1.5rem" }}>
          <span style={{ fontWeight: "bolder", fontSize: "2rem" }}>Note :</span>{" "}
          This application is deployed on Render, A free web services spin down
          after 15 minutes of inactivity and take up to a minute to spin back up
          when traffic resumes, causing potential delays in response times.So
          please reload it one time.
        </p>
      </div>
    </div>
  );
};

export default Note;
