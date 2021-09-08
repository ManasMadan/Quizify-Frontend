import { useParams, useSelector, useHistory, AddQuestion } from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);

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
          <AddQuestion quizcode={quizcode} />
        </div>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
