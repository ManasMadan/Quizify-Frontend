import {
  useParams,
  useSelector,
  useHistory,
  Question,
  QuestionOption,
  fetchallquestions,
  useState,
  useEffect,
  cookies,
} from "../../base";

export default function JoinQuizQuestions() {
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const history = useHistory();
  const authToken = cookies.get("auth-token");

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (authToken, quizcode) => {
    const data = await fetchallquestions(authToken, quizcode);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions(authToken, quizcode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loggedIn) {
    return (
      <div className="container">
        <h5 style={{ textAlign: "center" }}>QuizCode : {quizcode}</h5>
        {questions.map((question) => {
          if (
            question.questionType === "ShortAnswer" ||
            question.questionType === "LongAnswer"
          ) {
            return <Question question={question} key={question._id} />;
          } else if (
            question.questionType === "CheckBoxes" ||
            question.questionType === "MCQ"
          ) {
            return <QuestionOption question={question} key={question._id} />;
          } else {
            return null;
          }
        })}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50vh" }}
        >
          <button
            className="btn btn-primary"
            style={{ width: "10vw", height: "10vh" }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
