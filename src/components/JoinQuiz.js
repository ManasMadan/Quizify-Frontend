import React from "react";
import { useSelector } from "react-redux";

export default function JoinQuiz() {
  const style = useSelector((state) => state.changeStyle);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <p style={{ width: "60vw", minWidth: "200px" }}>
        Enter The Quiz Code That Must Be Provided To You
      </p>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Quiz Code"
          style={{ ...style, width: "60vw", minWidth: "200px" }}
        />
        <label htmlFor="floatingInput ">Quiz Code</label>
      </div>
      <button className="btn btn-primary mx-1">Join Quiz</button>
    </div>
  );
}
