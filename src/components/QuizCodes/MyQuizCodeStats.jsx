import {
  useParams,
  useEffect,
  useHistory,
  useState,
  fetchallquizcodesubmissions,
  useSelector,
  Question,
  QuestionOption,
  useRef,
} from "../../base";

export default function MyQuizCodeStats() {
  const style = useSelector((state) => state.changeStyle);
  const { quizcode } = useParams();
  const history = useHistory();
  const [submissions, setSubmissions] = useState([]);
  const [answers, setAnswers] = useState({ answers: [], name: "", email: "" });
  const authToken = localStorage.getItem("auth-token");
  const ref = useRef();

  useEffect(() => {
    const myfunction = async () => {
      const data = await fetchallquizcodesubmissions(authToken, quizcode);
      setSubmissions(data);
    };
    myfunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const myquizcodesSessionStorage = JSON.parse(
      sessionStorage.getItem("myQuizcodes")
    );
    if (!myquizcodesSessionStorage) {
      history.push("/");
      return;
    }
    for (let i = 0; i < myquizcodesSessionStorage.length; i++) {
      const element = myquizcodesSessionStorage[i];
      if (element.quizcode === quizcode) {
        return;
      }
    }
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let i = 1;
  if (submissions === []) {
    return <h2>Loading</h2>;
  } else {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        ></button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" style={style}>
            <div className="modal-content">
              <div className="modal-header" style={style}>
                <h5 className="modal-title" id="exampleModalLabel">
                  {answers.name}'s Submission
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={style}>
                <div className="container">
                  <div className="d-flex align-items-container justify-content-center">
                    <h3>Quizcode : {quizcode}</h3>
                  </div>
                  {answers.answers.map((question) => {
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
              </div>
            </div>
          </div>
        </div>

        <div
          className="container submissionsTable"
          style={{ overflowX: "scroll" }}
        >
          <table className="table" style={style}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date Submitted</th>
                <th scope="col">Time Submitted</th>
                <th scope="col">See Result</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const dateObj = new Date(submission.Date);
                return (
                  <tr key={submission._id}>
                    <th scope="row">{i++}</th>
                    <td>{submission.name}</td>
                    <td>{submission.email}</td>
                    <td>{`${dateObj.getDate()} - ${
                      dateObj.getMonth() + 1
                    } - ${dateObj.getFullYear()}`}</td>
                    <td>
                      {dateObj.getHours()} hours {dateObj.getMinutes()} minutes{" "}
                      {dateObj.getSeconds()} seconds
                    </td>
                    <td className="container d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          ref.current.click();
                          setAnswers(submission);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                        </svg>
                      </button>
                    </td>
                    <td>
                      {submission.marksAwarded} / {submission.totalMarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
