import { useParams, useSelector, useHistory } from "../base";

export default function JoinQuizQuestions() {
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const history = useHistory();

  if (loggedIn) {
    return (
      <div className="container">
        <h5 style={{ textAlign: "center" }}>QuizCode : {quizcode}</h5>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
