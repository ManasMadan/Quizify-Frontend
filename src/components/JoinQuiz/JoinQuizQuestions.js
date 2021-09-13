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
  const [answersSelected, setAnswersSelected] = useState([]);

  const fetchQuestions = async (authToken, quizcode) => {
    const data = await fetchallquestions(authToken, quizcode);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions(authToken, quizcode);
    const init = [];
    questions.forEach((e) => {
      init.push({ questionID: e._id, optionsSelected: [] });
    });

    setAnswersSelected(init);
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
            onClick={() => {
              const answers = [];
              const idsUsed = [];

              const textSolution = Array(
                ...document.getElementsByClassName("textSolution")
              );

              const questionOptionRadio = Array(
                ...document.getElementsByClassName("questionOptionRadio")
              );

              const questionOptionCheckBox = Array(
                ...document.getElementsByClassName("questionOptionCheckBox")
              );

              textSolution.forEach((e) => {
                answers.push({ questionID: e.id, optionsSelected: e.value });
                idsUsed.push(e.id);
              });

              questionOptionRadio.forEach((e) => {
                if (e.checked) {
                  answers.push({
                    questionID: e.id,
                    optionsSelected: e.nextSibling.data,
                  });
                  idsUsed.push(e.id);
                }
              });

              if (questions.length !== idsUsed.length) {
                for (let i = 0; i < questions.length; i++) {
                  if (idsUsed.indexOf(questions[i]._id) === -1) {
                    answers.push({
                      questionID: questions[i]._id,
                      optionsSelected: [],
                    });
                  }
                }
              }

              questionOptionCheckBox.forEach((e) => {
                if (e.checked) {
                  for (let i = 0; i < answers.length; i++) {
                    const element = answers[i];
                    if (element.questionID === e.id) {
                      element.optionsSelected = element.optionsSelected.concat(
                        e.nextSibling.data
                      );
                    }
                  }
                }
              });

              setAnswersSelected(answers);
            }}
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
