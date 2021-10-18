import { setAlert, useSelector, useDispatch } from "../../base";
import EquationEditor from "equation-editor-react";

export default function AddQuestion(props) {
  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();

  const referModalClose = props.referModalClose;
  const setIsMathEquation = props.stateMethods.setIsMathEquation;
  const setQuestionStatement = props.stateMethods.setQuestionStatement;
  const setQuestionMarks = props.stateMethods.setQuestionMarks;
  const setQuestionType = props.stateMethods.setQuestionType;
  const setOption1 = props.stateMethods.setOption1;
  const setOption2 = props.stateMethods.setOption2;
  const setOption3 = props.stateMethods.setOption3;
  const setOption4 = props.stateMethods.setOption4;
  const setCorrectAnswersOptions = props.stateMethods.setCorrectAnswersOptions;
  const setCorrectAnswerText = props.stateMethods.setCorrectAnswerText;

  const isMathEquation = props.stateVariables.isMathEquation;
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

  // Detect Mobile Device
  var isMobile = false; //initiate as false
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }
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
              {!isMobile ? (
                <div>
                  <input
                    checked={isMathEquation}
                    onChange={(e) => setIsMathEquation(e.target.checked)}
                    className="form-check-input mx-3"
                    type="checkbox"
                    onClick={() =>
                      setQuestionStatement(!isMathEquation ? "y = x" : "")
                    }
                    id="correctAnswerOption1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="correctAnswerOption1"
                  >
                    Is Math Equation
                  </label>
                </div>
              ) : (
                <div>
                  Tip : You Can Make Question Statement as a Math Equation in a
                  Desktop Browser !!!
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="QuestionStatement" className="form-label">
                Question Statement
              </label>
              {isMathEquation && !isMobile ? (
                <div
                  style={{
                    width: "100%",
                    border: "2px solid #e5e8eb",
                    borderRadius: "5px",
                    padding: "6px 12px",
                  }}
                >
                  <EquationEditor
                    value={questionStatement}
                    onChange={setQuestionStatement}
                    autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                    autoOperatorNames="sin cos tan log"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id="QuestionStatement"
                  value={questionStatement}
                  onChange={(e) => setQuestionStatement(e.target.value)}
                />
              )}
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
