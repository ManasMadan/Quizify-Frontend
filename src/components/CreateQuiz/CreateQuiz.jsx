import {
  setAlert,
  useHistory,
  useDispatch,
  useSelector,
  useState,
  createquizcode,
  setLoading,
} from "../../base";

export default function CreateQuiz() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const style = useSelector((state) => state.changeStyle);
  const [quizcode, setQuizCode] = useState("");
  let history = useHistory();
  const authToken = localStorage.getItem("auth-token");

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
        <p className="" style={{ width: "60vw", minWidth: "200px" }}>
          Enter A Random Quiz Code. It will be used to join the quiz.
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
          onClick={async () => {
            dispatch(setLoading(true));
            const res = await createquizcode(authToken, quizcode);
            if (res._id) {
              history.push(`/createquiz/${quizcode}`);
            } else {
              dispatch(
                setAlert({
                  type: "Danger",
                  message: res.error || res.errors[0].msg,
                })
              );
            }
            dispatch(setLoading(false));
          }}
          className="btn btn-primary"
          style={{ textDecoration: "none" }}
        >
          Create Quiz
        </button>
      </div>
    );
  }
}
