import {
  useSelector,
  useState,
  useHistory,
  useDispatch,
  setAlert,
} from "../base";

export default function Home() {
  const style = useSelector((state) => state.changeStyle);
  const [quizcode, setQuizcode] = useState("");
  const history = useHistory();
  const loggedIn = useSelector((state) => state.changeLoginState);
  const dispatch = useDispatch();

  return (
    <div className="container px-4 py-5" style={style}>
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start" style={style}>
          <h1 className="display-4 fw-bold lh-1 mb-3">Quiziz</h1>
          <p className="col-lg-10 fs-4">
            Create , Join Interactive Quiz, Forms or Surveys With Automatic
            Marking and Many More Features
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Quiz Code"
              style={style}
              value={quizcode}
              onChange={(e) => setQuizcode(e.target.value)}
            />
            <label htmlFor="floatingInput">Quiz Code</label>
          </div>
          <button
            disabled={quizcode.trim() === ""}
            className="btn btn-primary mx-1"
            onClick={() => {
              if (loggedIn && quizcode.trim() !== "") {
                history.push(`/joinquiz/${quizcode}`);
              } else {
                dispatch(
                  setAlert({ type: "Danger", message: "Sign in To Continue" })
                );
              }
            }}
          >
            Join Quiz
          </button>
          <span className="mx-2">or</span>
          <button
            disabled={quizcode.trim() === ""}
            className="btn btn-primary"
            onClick={() => {
              if (loggedIn && quizcode.trim() !== "") {
                history.push(`/createquiz/${quizcode}`);
              } else {
                dispatch(
                  setAlert({ type: "Danger", message: "Sign in To Continue" })
                );
              }
            }}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
