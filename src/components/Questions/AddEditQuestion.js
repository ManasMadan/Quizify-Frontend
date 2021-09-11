import { useSelector } from "../../base";

export default function AddQuestion(props) {
  const style = useSelector((state) => state.changeStyle);
  const referModalClose = props.referModalClose;
  const setQuestionStatement = props.stateMethods.setQuestionStatement;
  const setQuestionMarks = props.stateMethods.setQuestionMarks;
  const setQuestionType = props.stateMethods.setQuestionType;
  const setOption1 = props.stateMethods.setOption1;
  const setOption2 = props.stateMethods.setOption2;
  const setOption3 = props.stateMethods.setOption3;
  const setOption4 = props.stateMethods.setOption4;

  const questionStatement = props.stateVariables.questionStatement;
  const questionMarks = props.stateVariables.questionMarks;
  const questionType = props.stateVariables.questionType;
  const option1 = props.stateVariables.option1;
  const option2 = props.stateVariables.option2;
  const option3 = props.stateVariables.option3;
  const option4 = props.stateVariables.option4;

  return (
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content" style={style}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add/Edit Question
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref={referModalClose}
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
                value={questionStatement}
                onChange={(e) => setQuestionStatement(e.target.value)}
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
                value={questionMarks.toString()}
                onChange={(e) => setQuestionMarks(parseInt(e.target.value))}
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
                {questionType === "" ? "Question Type" : questionType}
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
                      setQuestionType(e.target.textContent);
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
                      setQuestionType(e.target.textContent);
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
                      setQuestionType(e.target.textContent);
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
                      setQuestionType(e.target.textContent);
                    }}
                  >
                    LongAnswer
                  </button>
                </li>
              </ul>
            </div>
            {questionType === "MCQ" || questionType === "CheckBoxes" ? (
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
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption2" className="form-label">
                    Option 2
                  </label>
                  <input
                    disabled={option1.trim().length === 0}
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption3" className="form-label">
                    Option 3
                  </label>
                  <input
                    disabled={option2.trim().length === 0}
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionOption4" className="form-label">
                    Option 4
                  </label>
                  <input
                    disabled={option3.trim().length === 0}
                    placeholder="Leave Empty for none"
                    type="text"
                    className="form-control"
                    id="questionOption4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
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
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.method}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
