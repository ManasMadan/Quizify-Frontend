import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const darkTheme = useSelector((state) => state.changeTheme);
  const style = useSelector((state) => state.changeStyle);

  return (
    <div className="container my-5">
      <h2>About Quizify</h2>
      <div className="accordion" id="accordionExample">
        <div
          className="accordion-item"
          style={{
            ...style,
            border: darkTheme ? "1px solid white" : "",
            borderBottom: "0px",
          }}
        >
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={{
                ...style,
                border: darkTheme ? "1px solid white" : "",
                borderBottom: "0px",
              }}
            >
              Open Source
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Quizify's Code is available on github
            </div>
          </div>
        </div>
        <div
          className="accordion-item"
          style={{
            ...style,
            border: darkTheme ? "1px solid white" : "",
            borderBottom: "0px",
          }}
        >
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={{
                ...style,
                border: darkTheme ? "1px solid white" : "",
                borderBottom: "0px",
              }}
            >
              Free To Use
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Quizify is Free To Use Without any Monthly Charges at any time
            </div>
          </div>
        </div>
        <div
          className="accordion-item"
          style={{
            ...style,
            border: darkTheme ? "1px solid white" : "",
            borderBottom: "0px",
          }}
        >
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={{ ...style }}
            >
              Browser Compatible
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Quizify works in any web browsers such as Chrome, Firefox,
              Internet Explorer, Safari, Opera.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}