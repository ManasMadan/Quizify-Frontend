import {
  useParams,
  useSelector,
  useHistory,
  AddQuestion,
  createquestion,
  cookies,
  useDispatch,
  setAlert,
  useRef,
  useState,
  Question,
  QuestionOption,
  deletequestion,
} from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");
  const dispatch = useDispatch();
  const ref = useRef();
  const [questions, setQuestions] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionMarks, setQuestionMarks] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const question = {
    questionStatement,
    questionMarks,
    questionType,
    quizcode,
    questionOptions: [option1, option2, option3, option4].filter(
      (e) => e.trim() !== ""
    ),
  };

  const deleteQuestionHandler = async (id) => {
    const res = await deletequestion(authToken, id);
    setQuestions(questions.filter((e) => e._id === res._id));
  };

  const addQuestion = async () => {
    const res = await createquestion(authToken, question);
    if (res._id) {
      dispatch(setAlert({ type: "Success", message: "Question Created" }));
      setQuestions(questions.concat(res));
    } else {
      dispatch(setAlert({ type: "Danger", message: res.error }));
    }
    ref.current.click();
  };

  if (loggedIn) {
    return (
      <div className="container-fluid text-center">
        <h5>QuizCode : {quizcode}</h5>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
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
          <AddQuestion
            quizcode={quizcode}
            addQuestion={addQuestion}
            refer={ref}
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
                <Question
                  question={question}
                  key={question._id}
                  edit={true}
                  deleteQuestionHandler={deleteQuestionHandler}
                />
              );
            } else if (
              question.questionType === "CheckBoxes" ||
              question.questionType === "MCQ"
            ) {
              return (
                <QuestionOption
                  question={question}
                  key={question._id}
                  edit={true}
                  deleteQuestionHandler={deleteQuestionHandler}
                />
              );
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
