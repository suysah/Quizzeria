import React from "react";
// import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

// import React from "react";

// const Test = () => {
//   const [starRating, setStarRating] = useState(0);

//   return (
//     <div>
//       <StarRating maxRating={5} onSetRating={setStarRating} />
//       <p> rating is : {starRating} </p>
//     </div>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["a", "b", "c", "d", "e"]}
      defaultRating={3}
    /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
