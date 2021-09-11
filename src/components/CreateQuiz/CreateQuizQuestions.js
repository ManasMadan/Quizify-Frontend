import {
  useParams,
  useSelector,
  useHistory,
  AddEditQuestion,
  createquestion,
  cookies,
  useDispatch,
  setAlert,
  useRef,
  useState,
  Question,
  QuestionOption,
  deletequestion,
  editquestion,
  fetchallquestions,
  useEffect,
} from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");
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
  // Question Object Using State Variables
  const question = {
    questionStatement,
    questionMarks,
    questionType,
    quizcode,
    questionOptions: [option1, option2, option3, option4].filter(
      (e) => e.trim() !== ""
    ),
  };

  // Fetch, Edit, Delete and Add Question Handlers
  const fetchQuestions = async (authToken, quizcode) => {
    const data = await fetchallquestions(authToken, quizcode);
    setQuestions(data);
  };
  const deleteQuestionHandler = async (id) => {
    const res = await deletequestion(authToken, id);
    setQuestions(questions.filter((e) => e._id !== res.question._id));
  };
  const editQuestionHandler = async (id) => {
    setQuestionId(id);
    referModalOpenEditQuestion.current.click();
    const questionData = questions.filter((e) => e._id === id)[0];
    setQuestionStatement(questionData.questionStatement);
    setQuestionMarks(questionData.questionMarks);
    setQuestionType(questionData.questionType);
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
    const res = await createquestion(authToken, question);
    if (res._id) {
      dispatch(setAlert({ type: "Success", message: "Question Created" }));
      setQuestions(questions.concat(res));
    } else {
      dispatch(setAlert({ type: "Danger", message: res.error }));
    }
    referModalCloseAddQuestion.current.click();
    setStateVariablesToInitialState();
  };
  const editQuestion = async (id) => {
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
      } else {
        dispatch(setAlert({ type: "Danger", message: res.error }));
      }
    } else {
      dispatch(setAlert({ type: "Danger", message: "Add Atleast A Option" }));
    }
    referModalCloseEditQuestion.current.click();
    setStateVariablesToInitialState();
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
  };

  // Fetch Questions On Page Arriving
  useEffect(() => {
    fetchQuestions(authToken, quizcode);
  }, []);

  if (loggedIn) {
    return (
      <div className="container-fluid text-center">
        <h5>QuizCode : {quizcode}</h5>
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
            }}
            stateVariables={{
              questionStatement,
              questionMarks,
              questionType,
              option1,
              option2,
              option3,
              option4,
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
            }}
            stateVariables={{
              questionStatement,
              questionMarks,
              questionType,
              option1,
              option2,
              option3,
              option4,
            }}
          />
        </div>

        <div className="container" style={{ textAlign: "left" }}>
          {questions.map((question) => {
            if (
              question.questionType === "ShortAnswer" ||
              question.questionType === "LongAnswer"
            ) {
              return (
                <div key={question._id}>
                  <Question
                    question={question}
                    edit={true}
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
                    edit={true}
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
