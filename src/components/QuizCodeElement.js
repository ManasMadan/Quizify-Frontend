import React from "react";

export default function QuizCodeElement(props) {
  const date = new Date(props.date);
  return (
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{props.code}</h5>
        <p class="card-text">Created On {Date.get}</p>
        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
