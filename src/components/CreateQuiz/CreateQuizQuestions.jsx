import {
  useParams,
  useSelector,
  useHistory,
  AddEditQuestion,
  createquestion,
  useDispatch,
  setAlert,
  useRef,
  useState,
  Question,
  QuestionOption,
  deletequestion,
  editquestion,
  fetchallquestionsanswers,
  useEffect,
  setLoading,
  html2canvas,
  Calculator,
} from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = localStorage.getItem("auth-token");
  const dispatch = useDispatch();
  // Modal Open and Close Question
  const referModalCloseAddQuestion = useRef();
  const referModalCloseEditQuestion = useRef();
  const referModalOpenEditQuestion = useRef();
  // Questions List
  const [questions, setQuestions] = useState([]);
  // Question Data States
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionMarks, setQuestionMarks] = useState(0);
  const [questionType, setQuestionType] = useState("");
  // Question Options
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [questionId, setQuestionId] = useState("");
  // Editing State - For Printing
  const [edit, setEdit] = useState(true);
  // Correct Answer
  const [correctAnswersOptions, setCorrectAnswersOptions] = useState([]);
  const [correctAnswerText, setCorrectAnswerText] = useState("");
  // Question Object Using State Variables
  const question = {
    questionStatement,
    questionMarks,
    questionType,
    quizcode,
    questionOptions: [option1, option2, option3, option4].filter(
      (e) => e.trim() !== ""
    ),
    correctAnswers:
      questionType === "ShortAnswer" || questionType === "LongAnswer"
        ? correctAnswerText
            .split(" ")
            .map((e) => e.trim().toLowerCase())
            .filter((e) => e !== "")
        : correctAnswersOptions,
  };

  // Calculator Position
  const [calculatorPosition, setCalculatorPosition] = useState({ x: 0, y: 0 });

  // Calculator Visibility State
  const [calculatorVisibility, setCalculatorVisibility] = useState(false);
  const toggleCalculatorVisibility = () => {
    setCalculatorPosition({ x: 0, y: 0 });
    setCalculatorVisibility(!calculatorVisibility);
  };

  // Fetch, Edit, Delete and Add Question Handlers
  const fetchQuestions = async (authToken, quizcode) => {
    dispatch(setLoading(true));
    const userId = localStorage.getItem("userId");
    const data = await fetchallquestionsanswers(authToken, quizcode, userId);
    setQuestions(data);
    dispatch(setLoading(false));
  };
  const deleteQuestionHandler = async (id) => {
    dispatch(setLoading(true));
    const res = await deletequestion(authToken, id);
    setQuestions(questions.filter((e) => e._id !== res.question._id));
    dispatch(setLoading(false));
  };
  const editQuestionHandler = async (id) => {
    setQuestionId(id);
    referModalOpenEditQuestion.current.click();
    const questionData = questions.filter((e) => e._id === id)[0];
    setQuestionStatement(questionData.questionStatement);
    setQuestionMarks(questionData.questionMarks);
    setQuestionType(questionData.questionType);

    if (
      questionData.questionType === "ShortAnswer" ||
      questionData.questionType === "LongAnswer"
    ) {
      setCorrectAnswerText(
        !questionData.correctAnswers
          ? ""
          : questionData.correctAnswers.join(" ")
      );
    } else if (
      questionData.questionType === "MCQ" ||
      questionData.questionType === "CheckBoxes"
    ) {
      setCorrectAnswersOptions(questionData.correctAnswers);
    }

    if (questionData.questionOptions.length === 4) {
      setOption1(questionData.questionOptions[0]);
      setOption2(questionData.questionOptions[1]);
      setOption3(questionData.questionOptions[2]);
      setOption4(questionData.questionOptions[3]);
    } else if (questionData.questionOptions.length === 3) {
      setOption1(questionData.questionOptions[0]);
      setOption2(questionData.questionOptions[1]);
      setOption3(questionData.questionOptions[2]);
    } else if (questionData.questionOptions.length === 2) {
      setOption1(questionData.questionOptions[0]);
      setOption2(questionData.questionOptions[1]);
    } else if (questionData.questionOptions.length === 1) {
      setOption1(questionData.questionOptions[0]);
    }
  };
  const addQuestion = async () => {
    referModalCloseAddQuestion.current.click();
    dispatch(setLoading(true));
    const res = await createquestion(authToken, question);
    if (res._id) {
      dispatch(setAlert({ type: "Success", message: "Question Created" }));
      window.scrollTo({ top: 0, behavior: "smooth" });

      setQuestions(questions.concat(res));
    } else {
      dispatch(setAlert({ type: "Danger", message: res.error }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setStateVariablesToInitialState();
    dispatch(setLoading(false));
  };
  const editQuestion = async (id) => {
    dispatch(setLoading(true));
    referModalCloseEditQuestion.current.click();
    if (
      option1.trim().length !== 0 ||
      questionType !== "MCQ" ||
      questionType !== "CheckBoxes"
    ) {
      const res = await editquestion(authToken, id, question);
      if (res._id) {
        let index = 0;
        for (let i = 0; i < questions.length; i++) {
          const element = questions[i];
          if (element._id === id) {
            break;
          }
          index++;
        }
        const newQuestionsArray = questions.slice(0, index);
        newQuestionsArray.push(res);
        newQuestionsArray.push(...questions.slice(index + 1));
        setQuestions(newQuestionsArray);
        dispatch(setAlert({ type: "Success", message: "Question Edited" }));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        dispatch(setAlert({ type: "Danger", message: res.error }));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      dispatch(setAlert({ type: "Danger", message: "Add Atleast A Option" }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setStateVariablesToInitialState();
    dispatch(setLoading(false));
  };
  const setStateVariablesToInitialState = () => {
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setQuestionId("");
    setQuestionMarks(0);
    setQuestionStatement("");
    setQuestionType("");
    setCorrectAnswerText("");
    setCorrectAnswersOptions([]);
  };

  // Fetch Questions On Page Arriving
  useEffect(() => {
    fetchQuestions(authToken, quizcode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Download Quiz as Image Functions + Handlers
  useEffect(() => {
    if (edit === false) {
      downloadImage(false);
    }
  }, [edit]);
  const downloadImageHandler = (answers) => {
    if (questions.length === 0) {
      dispatch(setAlert({ type: "Danger", message: "Atleast Add A Question" }));
      return;
    }

    dispatch(setLoading(true));
    if (answers) {
      const questionActions =
        document.getElementsByClassName("questionActions");
      for (let i = 0; i < questionActions.length; i++) {
        const element = questionActions[i];
        element.classList.add("d-none");
      }
    }

    if (!answers) {
      setEdit(false);
    } else {
      downloadImage(answers);
    }
  };
  const downloadImage = (answers) => {
    const input = document.getElementById("questionsDiv");
    input.insertAdjacentHTML(
      "afterbegin",
      `<span style="color: black;">Quiz Made Using Quizify<br>To Attempt Its Interactive Version, Go To ${process.env.REACT_APP_URL} and Enter The Code ${quizcode}</span>`
    );
    html2canvas(input).then((canvas) => {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      saveBase64AsFile(
        imgData,
        `${quizcode}-Questions${answers ? "-Answers" : ""}`
      );
      input.removeChild(input.children[0]);
      if (!answers) {
        setEdit(true);
      } else {
        const questionActions =
          document.getElementsByClassName("questionActions");
        for (let i = 0; i < questionActions.length; i++) {
          const element = questionActions[i];
          element.classList.remove("d-none");
        }
      }
      dispatch(
        setAlert({ type: "Success", message: "Downloaded Successfully" })
      );
      dispatch(setLoading(false));
    });
  };
  function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");
    document.body.appendChild(link); // for Firefox
    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }

  if (loggedIn) {
    return (
      <div className="container-fluid text-center">
        <Calculator
          show={calculatorVisibility}
          calculatorPosition={calculatorPosition}
          setCalculatorPosition={setCalculatorPosition}
        />
        <div className="fixed-top" onClick={toggleCalculatorVisibility}>
          <div
            className="btn btn-primary position-absolute end-0 top-0 me-3"
            style={{
              width: "50px",
              height: "45px",
              marginTop: "85px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calculator-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5zm0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-1z" />
            </svg>
          </div>
        </div>
        <h5>QuizCode : {quizcode}</h5>
        <div className="d-flex align-items-center justify-content-center my-3 flex-wrap">
          <button
            type="button"
            className="btn btn-primary mx-2 my-1"
            onClick={() => downloadImageHandler(false)}
          >
            Download Quiz as Image
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => downloadImageHandler(true)}
          >
            Download Quiz With Answers as Image
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={setStateVariablesToInitialState}
        >
          Add Question
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <AddEditQuestion
            method={addQuestion}
            referModalClose={referModalCloseAddQuestion}
            stateMethods={{
              setQuestionStatement,
              setQuestionMarks,
              setQuestionType,
              setOption1,
              setOption2,
              setOption3,
              setOption4,
              setCorrectAnswersOptions,
              setCorrectAnswerText,
            }}
            stateVariables={{
              questionStatement,
              questionMarks,
              questionType,
              option1,
              option2,
              option3,
              option4,
              correctAnswersOptions,
              correctAnswerText,
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          ref={referModalOpenEditQuestion}
        >
          Edit Question Hidden
        </button>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <AddEditQuestion
            method={() => editQuestion(questionId)}
            referModalClose={referModalCloseEditQuestion}
            stateMethods={{
              setQuestionStatement,
              setQuestionMarks,
              setQuestionType,
              setOption1,
              setOption2,
              setOption3,
              setOption4,
              setCorrectAnswersOptions,
              setCorrectAnswerText,
            }}
            stateVariables={{
              questionStatement,
              questionMarks,
              questionType,
              option1,
              option2,
              option3,
              option4,
              correctAnswersOptions,
              correctAnswerText,
            }}
          />
        </div>

        <div
          className="container"
          style={{ textAlign: "left" }}
          id="questionsDiv"
        >
          {questions.map((question) => {
            if (
              question.questionType === "ShortAnswer" ||
              question.questionType === "LongAnswer"
            ) {
              return (
                <div key={question._id}>
                  <Question
                    question={question}
                    edit={edit}
                    deleteQuestionHandler={deleteQuestionHandler}
                    editQuestionHandler={editQuestionHandler}
                  />
                </div>
              );
            } else if (
              question.questionType === "CheckBoxes" ||
              question.questionType === "MCQ"
            ) {
              return (
                <div key={question._id}>
                  <QuestionOption
                    question={question}
                    edit={edit}
                    deleteQuestionHandler={deleteQuestionHandler}
                    editQuestionHandler={editQuestionHandler}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
