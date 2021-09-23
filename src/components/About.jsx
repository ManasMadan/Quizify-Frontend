import { useSelector } from "../base";

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
            borderRight: darkTheme ? "1px solid white" : "",
            borderLeft: darkTheme ? "1px solid white" : "",
            borderTop: darkTheme ? "1px solid white" : "",
          }}
        >
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
              style={{
                ...style,
                borderRight: darkTheme ? "1px solid white" : "",
                borderLeft: darkTheme ? "1px solid white" : "",
                borderTop: darkTheme ? "1px solid white" : "",
              }}
            >
              Open Source
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Quizify's Code is available on github :{" "}
              <a href="https://github.com/ManasMadan" target="_blank">
                @ManasMadan
              </a>
            </div>
          </div>
        </div>
        <div
          className="accordion-item"
          style={{
            ...style,
            borderRight: darkTheme ? "1px solid white" : "",
            borderLeft: darkTheme ? "1px solid white" : "",
            borderTop: darkTheme ? "1px solid white" : "",
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
                borderRight: darkTheme ? "1px solid white" : "",
                borderLeft: darkTheme ? "1px solid white" : "",
                borderTop: darkTheme ? "1px solid white" : "",
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
            borderRight: darkTheme ? "1px solid white" : "",
            borderLeft: darkTheme ? "1px solid white" : "",
            borderTop: darkTheme ? "1px solid white" : "",
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
