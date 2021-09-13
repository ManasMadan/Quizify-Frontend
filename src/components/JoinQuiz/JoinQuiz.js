import {
  useSelector,
  joinquizcode,
  cookies,
  useState,
  useHistory,
  useDispatch,
  setAlert,
  checkquizcode,
} from "../../base";

export default function JoinQuiz() {
  const style = useSelector((state) => state.changeStyle);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");
  const [quizcode, setQuizCode] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();

  if (!loggedIn) {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <h2>Sign In To Continue</h2>
      </div>
    );
  } else {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <p style={{ width: "60vw", minWidth: "200px" }}>
          Enter The Quiz Code That Must Be Provided To You
        </p>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Quiz Code"
            value={quizcode}
            onChange={(e) => setQuizCode(e.target.value)}
            style={{ ...style, width: "60vw", minWidth: "200px" }}
          />
          <label htmlFor="floatingInput ">Quiz Code</label>
        </div>
        <button
          disabled={quizcode.trim() === ""}
          className="btn btn-primary mx-1"
          onClick={async () => {
            const quizcoderes = await checkquizcode(authToken, quizcode);
            console.log(quizcoderes);
            if (!quizcoderes.error) {
              if (!quizcoderes.quizcode.deleted) {
                const res = await joinquizcode(authToken, quizcode);
                if (res.length >= 0) {
                  dispatch(
                    setAlert({
                      type: "Success",
                      message: `Joined Quiz ${quizcode}`,
                    })
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });

                  history.push(`/joinquiz/${quizcode}`);
                } else {
                  dispatch(
                    setAlert({
                      type: "Danger",
                      message: res.error,
                    })
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              } else {
                dispatch(
                  setAlert({
                    type: "Danger",
                    message: "QuizCode Has Been Deleted",
                  })
                );
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            } else {
              dispatch(
                setAlert({
                  type: "Danger",
                  message: "Enter A Valid Quizcode",
                })
              );
            }
          }}
        >
          Join Quiz
        </button>
      </div>
    );
  }
}
