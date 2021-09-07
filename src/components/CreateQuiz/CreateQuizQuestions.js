import { useParams, useSelector, useHistory } from "../../base";

export default function CreateQuizQuestions() {
  const history = useHistory();
  const { quizcode } = useParams();
  const loggedIn = useSelector((state) => state.changeLoginState);

  if (loggedIn) {
    return (
      <div className="container-fluid">
        <h5 style={{ width: "100vw", textAlign: "center" }}>
          QuizCode : {quizcode}
        </h5>
      </div>
    );
  } else {
    history.push("/");
    return null;
  }
}
