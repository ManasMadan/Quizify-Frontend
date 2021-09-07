import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CreateQuiz() {
  const style = useSelector((state) => state.changeStyle);
  const [quizcode, setQuizCode] = useState("")

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <p className="" style={{ width: "60vw", minWidth: "200px" }}>
        Enter A Random Quiz Code. It will be used to join the quiz.
      </p>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Quiz Code"
          value = {quizcode}
          onChange={(e)=>setQuizCode(e.target.value)}
          style={{ ...style, width: "60vw", minWidth: "200px" }}
        />
        <label htmlFor="floatingInput ">Quiz Code</label>
      </div>
      <Link
        to={`/createquiz/${quizcode}`}
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        Create Quiz
      </Link>
    </div>
  );
}
