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
  editquestion,
  fetchallquestions,
  useEffect,
  EditQuestion,
} from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");
  const dispatch = useDispatch();
  const referModalClose = useRef();
  const referModalClose2 = useRef();
  const referModalOpen = useRef();
  const referModalOpen2 = useRef();
  const [questions, setQuestions] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionMarks, setQuestionMarks] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [questionId, setQuestionId] = useState("");

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
    setQuestions(questions.filter((e) => e._id !== res.question._id));
  };
  const fetchQuestions = async (authToken, quizcode) => {
    const data = await fetchallquestions(authToken, quizcode);
    setQuestions(data);
  };

  const editQuestionHandler = async (id) => {
    setQuestionId(id);
    referModalOpen2.current.click();
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
    referModalClose.current.click();
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
    referModalClose2.current.click();
  };

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
          ref={referModalOpen}
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
            referModalClose={referModalClose}
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
          ref={referModalOpen2}
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
          <EditQuestion
            quizcode={quizcode}
            editQuestion={editQuestion}
            referModalClose={referModalClose2}
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
              questionId,
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
