import {
  useState,
  useEffect,
  useParams,
  fetchallmysubmissions,
  fetchallquestionsanswers,
  cookies,
  Question,
  QuestionOption,
} from "../../base";

export default function MyQuizSubmission() {
  const { quizcode } = useParams();
  const authToken = cookies.get("auth-token");
  const [submission, setSubmission] = useState({ answers: [] });
  const [questions, setQuestions] = useState([]);

  const fetchSubmission = async () => {
    const res = await fetchallmysubmissions(authToken);
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      if (element.quizcode === quizcode) {
        setSubmission(element);
      }
    }
  };

  const fetchSolutions = async () => {
    const userId = localStorage.getItem("userId");
    const res = await fetchallquestionsanswers(authToken, quizcode, userId);
    return res;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await fetchSubmission();
    const questionsWithAnswers = await fetchSolutions();

    for (let j = 0; j < questionsWithAnswers.length; j++) {
      for (let i = 0; i < submission.answers.length; i++) {
        if (questionsWithAnswers[j]._id === submission.answers[i].questionID) {
          const updated = questionsWithAnswers[j];
          updated.marked = submission.answers[i].optionsSelected;
          updated.marksAwarded = 0;

          if (typeof updated.marked == "string") {
            updated.marked = updated.marked.toLowerCase();
          }

          for (let k = 0; k < updated.correctAnswers.length; k++) {
            if (updated.marked.includes(updated.correctAnswers[k])) {
              updated.marksAwarded = updated.questionMarks;
              break;
            }
          }
          questionsWithAnswers[j] = updated;
          break;
        }
      }
    }

    setQuestions([...questionsWithAnswers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-container justify-content-center">
        <h3>Quizcode : {quizcode}</h3>
      </div>

      {questions.map((question) => {
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
