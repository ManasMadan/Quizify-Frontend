import { setAlert, useSelector, useDispatch } from "../../base";

export default function AddQuestion(props) {
  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();

  const referModalClose = props.referModalClose;
  const setQuestionStatement = props.stateMethods.setQuestionStatement;
  const setQuestionMarks = props.stateMethods.setQuestionMarks;
  const setQuestionType = props.stateMethods.setQuestionType;
  const setOption1 = props.stateMethods.setOption1;
  const setOption2 = props.stateMethods.setOption2;
  const setOption3 = props.stateMethods.setOption3;
  const setOption4 = props.stateMethods.setOption4;
  const setCorrectAnswersOptions = props.stateMethods.setCorrectAnswersOptions;
  const setCorrectAnswerText = props.stateMethods.setCorrectAnswerText;

  const questionStatement = props.stateVariables.questionStatement;
  const questionMarks = props.stateVariables.questionMarks;
  const questionType = props.stateVariables.questionType;
  const option1 = props.stateVariables.option1;
  const option2 = props.stateVariables.option2;
  const option3 = props.stateVariables.option3;
  const option4 = props.stateVariables.option4;
  const correctAnswersOptions = props.stateVariables.correctAnswersOptions;
  const correctAnswerText = props.stateVariables.correctAnswerText;

  const optionsAreNotSame =
    (option1 !== option2 &&
      option1 !== option3 &&
      option1 !== option4 &&
      option2 !== option3 &&
      option2 !== option4 &&
      option3 !== option4) ||
    option1 === "" ||
    option2 === "" ||
    option3 === "" ||
    option4 === "";

  const addRemoveCorrectAnswer = (option) => {
    if (correctAnswersOptions.includes(option)) {
      setCorrectAnswersOptions(
        correctAnswersOptions.filter((e) => e !== option)
      );
    } else {
      setCorrectAnswersOptions(correctAnswersOptions.concat(option));
    }
  };

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
                min={0}
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

            <div className={`${questionMarks === 0 ? "d-none" : ""}`}>
              {questionType === "MCQ" || questionType === "CheckBoxes" ? (
                <>
                  <div className="mb-3 my-3">Correct Answer</div>
                  <div className="d-flex mb-3 my-3">
                    <div
                      className={`form-check mx-3 ${
                        option1.trim().length === 0 ? "d-none" : ""
                      }`}
                    >
                      <input
                        checked={
                          !correctAnswersOptions
                            ? false
                            : correctAnswersOptions.includes(option1)
                        }
                        onChange={() => addRemoveCorrectAnswer(option1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="correctAnswerOption1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="correctAnswerOption1"
                      >
                        {option1}
                      </label>
                    </div>
                    <div
                      className={`form-check mx-3 ${
                        option2.trim().length === 0 ? "d-none" : ""
                      }`}
                    >
                      <input
                        checked={
                          !correctAnswersOptions
                            ? false
                            : correctAnswersOptions.includes(option2)
                        }
                        onChange={() => addRemoveCorrectAnswer(option2)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="correctAnswerOption2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="correctAnswerOption2"
                      >
                        {option2}
                      </label>
                    </div>
                  </div>
                  <div className="d-flex mb-3 my-3">
                    <div
                      className={`form-check mx-3 ${
                        option3.trim().length === 0 ? "d-none" : ""
                      }`}
                    >
                      <input
                        checked={
                          !correctAnswersOptions
                            ? false
                            : correctAnswersOptions.includes(option3)
                        }
                        onChange={() => addRemoveCorrectAnswer(option3)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="correctAnswerOption3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="correctAnswerOption3"
                      >
                        {option3}
                      </label>
                    </div>
                    <div
                      className={`form-check mx-3 ${
                        option4.trim().length === 0 ? "d-none" : ""
                      }`}
                    >
                      <input
                        checked={
                          !correctAnswersOptions
                            ? false
                            : correctAnswersOptions.includes(option4)
                        }
                        onChange={() => addRemoveCorrectAnswer(option4)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="correctAnswerOption4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="correctAnswerOption4"
                      >
                        {option4}
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-3 my-3">
                  <label htmlFor="correctAnswerInputBox" className="form-label">
                    Correct Answer
                  </label>
                  <div className="mb-3 my-2">
                    Enter Correct Answer's Keywords Seperated By Space, The
                    Marks Will Be Awarded If The Answer Contains any one of the
                    Keywords.
                  </div>
                  <input
                    value={correctAnswerText}
                    onChange={(e) => setCorrectAnswerText(e.target.value)}
                    placeholder="Enter Correct Answer's Keywords Seperated By Space"
                    type="text"
                    className="form-control"
                    id="correctAnswerInputBox"
                  />
                </div>
              )}
            </div>
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
            onClick={() => {
              if (
                questionMarks > 0 &&
                (questionType === "MCQ" || questionType === "CheckBoxes") &&
                correctAnswersOptions.length === 0
              ) {
                dispatch(
                  setAlert({
                    type: "Danger",
                    message:
                      "Atleast Add A Correct Option as Marks Is Greater than 0",
                  })
                );
                return;
              }

              if (
                questionMarks > 0 &&
                (questionType === "ShortAnswer" ||
                  questionType === "LongAsnwer") &&
                correctAnswerText.trim().length === 0
              ) {
                dispatch(
                  setAlert({
                    type: "Danger",
                    message:
                      "Atleast Add A Correct Option as Marks Is Greater than 0",
                  })
                );
                return;
              }

              if (
                questionType === "ShortAnswer" ||
                questionType === "LongAnswer" ||
                optionsAreNotSame
              ) {
                props.method();
              } else {
                dispatch(
                  setAlert({
                    type: "Danger",
                    message: "Options Cannot Be Same",
                  })
                );
              }
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
