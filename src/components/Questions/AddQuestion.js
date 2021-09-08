import {
  useState,
  createquestion,
  cookies,
  useDispatch,
  useSelector,
  setAlert,
  useRef,
} from "../../base";

export default function AddQuestion(props) {
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionMarks, setQuestionMarks] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const quizcode = props.quizcode;
  const question = {
    questionStatement,
    questionMarks,
    questionType,
    quizcode,
    questionOptions: [option1, option2, option3, option4].filter(
      (e) => e.trim() !== ""
    ),
  };
  const authToken = cookies.get("auth-token");
  const dispatch = useDispatch();
  const ref = useRef();
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
            ref={ref}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => {
              const res = await createquestion(authToken, question);
              if (res._id) {
                dispatch(
                  setAlert({ type: "Success", message: "Question Created" })
                );
              } else {
                dispatch(setAlert({ type: "Danger", message: res.error }));
              }
              ref.current.click();
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
