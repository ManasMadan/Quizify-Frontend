import React from "react";
import { useParams } from "react-router";

export default function JoinQuizQuestions() {
  const { quizcode } = useParams();
  return (
    <div className="container-fluid">
      <h5 style={{ width: "100vw", textAlign: "center" }}>
        QuizCode : {quizcode}
      </h5>
    </div>
  );
}
