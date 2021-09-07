import { useParams, useSelector, useHistory } from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);

  if (loggedIn) {
    return (
      <div className="container-fluid text-center">
        <h5>QuizCode : {quizcode}</h5>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
