import { useSelector } from "../../base";

export default function AddQuestion(props) {
  const style = useSelector((state) => state.changeStyle);

  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content" style={style}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add Question
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body" style={{ textAlign: "left" }}>
          <form>
            <div className="mb-3">
              <label htmlFor="QuestionStatement" className="form-label">
                Question Statement
              </label>
              <input
                type="text"
                className="form-control"
                id="QuestionStatement"
                value={props.stateVariables.questionStatement}
                onChange={(e) =>
                  props.stateMethods.setQuestionStatement(e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="QuestionMarks" className="form-label">
                Question Marks
              </label>
              <input
                type="number"
                className="form-control"
                id="QuestionMarks"
                value={props.stateVariables.questionMarks.toString()}
                onChange={(e) =>
                  props.stateMethods.setQuestionMarks(parseInt(e.target.value))
                }
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="questionTypeDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.stateVariables.questionType === ""
                  ? "Question Type"
                  : props.stateVariables.questionType}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="questionTypeDropdown"
              >
                <li>
                  <button
                    className="dropdown-item"
                    name="questionType"
                    onClick={(e) => {
                      e.preventDefault();
                      props.stateMethods.setQuestionType(e.target.textContent);
                    }}
                  >
                    MCQ
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    name="questionType"
                    onClick={(e) => {
                      e.preventDefault();
                      props.stateMethods.setQuestionType(e.target.textContent);
                    }}
                  >
                    CheckBoxes
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    name="questionType"
                    onClick={(e) => {
                      e.preventDefault();
                      props.stateMethods.setQuestionType(e.target.textContent);
                    }}
                  >
                    ShortAnswer
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    name="questionType"
                    onClick={(e) => {
                      e.preventDefault();
                      props.stateMethods.setQuestionType(e.target.textContent);
                    }}
                  >
                    LongAnswer
                  </button>
                </li>
              </ul>
            </div>
            {props.stateVariables.questionType === "MCQ" ||
            props.stateVariables.questionType === "CheckBoxes" ? (
              <>
                <div className="mb-3">
                  <label htmlFor="questionOption1" className="form-label">
                    Option 1
                  </label>
                  <input
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption1"
                    value={props.stateVariables.option1}
                    onChange={(e) =>
                      props.stateMethods.setOption1(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption2" className="form-label">
                    Option 2
                  </label>
                  <input
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption2"
                    value={props.stateVariables.option2}
                    onChange={(e) =>
                      props.stateMethods.setOption2(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption3" className="form-label">
                    Option 3
                  </label>
                  <input
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption3"
                    value={props.stateVariables.option3}
                    onChange={(e) =>
                      props.stateMethods.setOption3(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption4" className="form-label">
                    Option 4
                  </label>
                  <input
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption4"
                    value={props.stateVariables.option4}
                    onChange={(e) =>
                      props.stateMethods.setOption4(e.target.value)
                    }
                  />
                </div>
              </>
            ) : null}
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={props.refer}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.addQuestion}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
