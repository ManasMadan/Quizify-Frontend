import { useSelector } from "../../base";
import MathJax from "react-mathjax";

export default function QuestionOption(props) {
  const {
    questionStatement,
    questionMarks,
    questionOptions,
    questionType,
    correctAnswers,
    isMathEquation,
    _id,
  } = props.question;
  const style = useSelector((state) => state.changeStyle);
  const showCorrectAnswers = props.edit && questionMarks !== 0;
  const showCorrectAnswersMarks = props.view && questionMarks !== 0;

  let key = 1;
  return (
    <div className="card my-3 position-relative" key={_id}>
      <div className="card-body" style={style}>
        <h5 className="card-title">
          {isMathEquation ? (
            <MathJax.Provider>
              <MathJax.Node formula={questionStatement} />
            </MathJax.Provider>
          ) : (
            <h5 className="card-title">{questionStatement}</h5>
          )}
        </h5>
        <br />
        <div className="mb-3 d-flex flex-column">
          {questionType === "MCQ" ? (
            <div className="d-flex flex-column">
              {questionOptions.map((e) => {
                return (
                  <span key={++key}>
                    <input
                      className="form-check-input mx-3 questionOptionRadio"
                      type="radio"
                      name={`option${_id}`}
                      id={`${_id}`}
                      checked={
                        e === props.marked || (props.view ? false : null)
                      }
                    />
                    {e}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="d-flex flex-column">
              {questionOptions.map((e) => {
                return (
                  <>
                    <span key={++key}>
                      <input
                        className="form-check-input mx-3 questionOptionCheckBox"
                        type="checkbox"
                        name={`option${_id}`}
                        id={`${_id}`}
                        checked={
                          props.marked.includes(e) ||
                          (props.view ? false : null)
                        }
                      />
                      {e}
                    </span>
                  </>
                );
              })}
            </div>
          )}
          {showCorrectAnswersMarks && (
            <div className="container mt-3" style={style}>
              Correct Answers : {props.correctAnswer.join(", ")}
            </div>
          )}
          {props.view && (
            <div className="container mt-3" style={style}>
              Marks Awarded : {props.marksAwarded}
            </div>
          )}
        </div>
      </div>

      {showCorrectAnswers && (
        <div style={style}>
          <div className="mx-5">
            Correct Answers : {!correctAnswers ? "" : correctAnswers.join(", ")}
          </div>
        </div>
      )}

      {props.edit && (
        <div
          className="d-flex align-items-center justify-content-center questionActions"
          style={style}
        >
          <span
            className="btn btn-primary my-2 mx-2"
            onClick={() => {
              props.deleteQuestionHandler(_id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </span>
          <span
            className="btn btn-primary my-2 mx-2"
            onClick={() => {
              props.editQuestionHandler(_id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
        }}
      >
        <span className="badge bg-danger" style={{ borderRadius: 0 }}>
          {questionMarks}
        </span>
      </div>
    </div>
  );
}

QuestionOption.defaultProps = {
  marked: [],
};
