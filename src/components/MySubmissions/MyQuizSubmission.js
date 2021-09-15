import {
  useState,
  useEffect,
  useParams,
  fetchallmysubmissions,
  cookies,
  Question,
  QuestionOption,
} from "../../base";

export default function MyQuizSubmission() {
  const { quizcode } = useParams();
  const authToken = cookies.get("auth-token");
  const [submission, setSubmission] = useState({ answers: [] });

  const fetchSubmission = async () => {
    if (authToken) {
      const res = await fetchallmysubmissions(authToken);
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if (element.quizcode === quizcode) {
          return element;
        }
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetchSubmission();
    setSubmission(res);
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
