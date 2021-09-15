import {
  useParams,
  useDispatch,
  useSelector,
  useHistory,
  Question,
  QuestionOption,
  fetchallquestions,
  useState,
  useEffect,
  createsubmission,
  createsubmittedby,
  setAlert,
  fetchallquestionsanswers,
} from "../../base";

export default function JoinQuizQuestions() {
  const { quizcode } = useParams();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const history = useHistory();
  const authToken = localStorage.getItem("auth-token");
  const [questions, setQuestions] = useState([]);
  const [submission, setSubmission] = useState([]);

  const fetchQuestions = async (authToken, quizcode) => {
    const data = await fetchallquestions(authToken, quizcode);
    setQuestions(data);
  };

  const handleSubmission = async (
    authToken,
    quizcode,
    answers,
    totalMarks,
    marksAwarded,
    email
  ) => {
    const res = await createsubmission(
      authToken,
      quizcode,
      answers,
      totalMarks,
      marksAwarded,
      email
    );
    sessionStorage.setItem(
      "mySubmissions",
      JSON.stringify(
        JSON.parse(sessionStorage.getItem("mySubmissions")).concat(
          res.submission
        )
      )
    );
    if (res.submission) {
      dispatch(
        setAlert({ type: "Success", message: "Submitted Successfully" })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (res.error) {
      dispatch(setAlert({ type: "Danger", message: res.error }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      dispatch(setAlert({ type: "Danger", message: "Some Error Occured" }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const fetchSolutions = async () => {
    const userId = localStorage.getItem("userId");
    const res = await fetchallquestionsanswers(authToken, quizcode, userId);
    return res;
  };

  const submit = async () => {
    const questionsWithAnswers = await fetchSolutions();
    let totalMarks = 0;
    let marksAwarded = 0;
    for (let j = 0; j < questionsWithAnswers.length; j++) {
      totalMarks += questionsWithAnswers[j].questionMarks;
      for (let i = 0; i < submission.length; i++) {
        if (questionsWithAnswers[j]._id === submission[i].questionID) {
          const updated = questionsWithAnswers[j];
          updated.marked = submission[i].optionsSelected;
          updated.marksAwarded = 0;
          if (
            typeof updated.marked == "string" &&
            (updated.questionType === "ShortAnswer" ||
              updated.questionType === "LongAnswer")
          ) {
            updated.marked = updated.marked.toLowerCase();
          }

          for (let k = 0; k < updated.correctAnswers.length; k++) {
            if (updated.marked.includes(updated.correctAnswers[k])) {
              updated.marksAwarded = updated.questionMarks;
              marksAwarded += updated.questionMarks;
              break;
            }
          }
          questionsWithAnswers[j] = updated;
          break;
        }
      }
    }

    return { questionsWithAnswers, marksAwarded, totalMarks };
  };

  useEffect(() => {
    fetchQuestions(authToken, quizcode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (submission.length > 0) {
      const email = await localStorage.getItem("userEmail");
      await createsubmittedby(authToken, quizcode);
      const { questionsWithAnswers, totalMarks, marksAwarded } = await submit();
      await handleSubmission(
        authToken,
        quizcode,
        questionsWithAnswers,
        totalMarks,
        marksAwarded,
        email
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission]);

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
            onClick={async () => {
              const answers = [];
              const idsUsed = [];

              const email = await localStorage.getItem("userEmail");
              if (!email) {
                dispatch(
                  setAlert({ type: "Danger", message: "Sign In To Continue" })
                );
              }
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

              setSubmission([...answers]);
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
