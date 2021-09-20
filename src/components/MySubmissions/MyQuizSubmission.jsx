import {
  useState,
  useEffect,
  useParams,
  fetchallusersubmissions,
  Question,
  QuestionOption,
  useDispatch,
  setLoading,
} from "../../base";

export default function MyQuizSubmission() {
  const { quizcode } = useParams();
  const authToken = localStorage.getItem("auth-token");
  const [submission, setSubmission] = useState({ answers: [] });
  const dispatch = useDispatch();

  const fetchSubmission = async () => {
    dispatch(setLoading(true));
    if (authToken) {
      const res = await fetchallusersubmissions(authToken);
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if (element.quizcode === quizcode) {
          dispatch(setLoading(false));
          return element;
        }
      }
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const myfunction = async () => {
      const res = await fetchSubmission();
      setSubmission(res);
    };
    myfunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-container justify-content-center">
        <h3>Quizcode : {quizcode}</h3>
      </div>
      {submission.answers.map((question) => {
        if (
          question.questionType === "ShortAnswer" ||
          question.questionType === "LongAnswer"
        ) {
          return (
            <Question
              question={question}
              key={question._id}
              view={true}
              marked={question.marked}
              correctAnswer={question.correctAnswers}
              marksAwarded={question.marksAwarded}
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
              view={true}
              marked={question.marked}
              correctAnswer={question.correctAnswers}
              marksAwarded={question.marksAwarded}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
