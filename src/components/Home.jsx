import {
  useSelector,
  useState,
  useHistory,
  useDispatch,
  setAlert,
  fetchallquestions,
  createquizcode,
  fetchallusersubmissions,
  setLoading,
} from "../base";

export default function Home() {
  // Style Redux State
  const style = useSelector((state) => state.changeStyle);
  // LoggedIn Redux State
  const loggedIn = useSelector((state) => state.changeLoginState);
  // QuizCode State for Input Tag - Join Quiz / Create Quiz
  const [quizcode, setQuizcode] = useState("");
  // History
  const history = useHistory();
  // Dispatch
  const dispatch = useDispatch();
  // Auth Token From LocalStorage
  const authToken = localStorage.getItem("auth-token");

  // Join Quiz Handler
  const joinQuizHandler = async () => {
    dispatch(setLoading(true));
    if (!loggedIn) {
      dispatch(setAlert({ type: "Danger", message: "Sign in To Continue" }));
    }
    if (authToken) {
      const submissions = await fetchallusersubmissions(authToken);
      for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        if (submission.quizcode === quizcode) {
          dispatch(
            setAlert({
              type: "Danger",
              message: "You Have Already Submitted",
            })
          );
          dispatch(setLoading(false));
          return;
        }
      }

      if (loggedIn && quizcode.trim() !== "") {
        const res = await fetchallquestions(authToken, quizcode);
        if (res.length >= 0) {
          dispatch(
            setAlert({
              type: "Success",
              message: `Joined Quiz ${quizcode}`,
            })
          );
          history.push(`/joinquiz/${quizcode}`);
        } else {
          dispatch(
            setAlert({
              type: "Danger",
              message: res.error,
            })
          );
        }
      } else {
        dispatch(setAlert({ type: "Danger", message: "Sign in To Continue" }));
      }
    }
    dispatch(setLoading(false));
  };

  // Create Quiz Handler
  const createQuizHandler = async () => {
    dispatch(setLoading(true));
    if (loggedIn && quizcode.trim() !== "") {
      const res = await createquizcode(authToken, quizcode);
      if (res.quizcode) {
        dispatch(
          setAlert({
            type: "Success",
            message: `Created Quiz ${quizcode}`,
          })
        );
        history.push(`/createquiz/${quizcode}`);
      } else {
        dispatch(
          setAlert({
            type: "Danger",
            message: res.error || res.errors[0].msg,
          })
        );
      }
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="container px-4 py-5" style={style}>
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start" style={style}>
          <h1 className="display-4 fw-bold lh-1 mb-3">Quizify</h1>
          <p className="col-lg-10 fs-4">
            Create , Join Interactive Quiz, Forms or Surveys With Automatic
            Marking and Many More Features
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="form-floating mb-3">
            {/* Input Tag For Quizcode State */}
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
          {/* JoinQuiz and Create Quiz Button Disabled When QuizCode Length is 0 after removing whitespaces */}
          <button
            disabled={quizcode.trim() === ""}
            className="btn btn-primary mx-1"
            onClick={joinQuizHandler}
          >
            Join Quiz
          </button>
          <span className="mx-2">or</span>
          <button
            disabled={quizcode.trim() === ""}
            className="btn btn-primary"
            onClick={createQuizHandler}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
