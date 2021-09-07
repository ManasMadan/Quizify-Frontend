import { useSelector, Link } from "../base";

export default function Home() {
  const style = useSelector((state) => state.changeStyle);

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
            />
            <label htmlFor="floatingInput">Quiz Code</label>
          </div>
          <Link to="/joinquiz" className="btn btn-primary mx-1">
            Join Quiz
          </Link>
          <span className="mx-2">or</span>
          <Link
            to="/createquiz"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            Create Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
