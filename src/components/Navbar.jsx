import {
  toggleTheme,
  toggleStyle,
  logout,
  setAlert,
  useDispatch,
  useSelector,
  Link,
  signOut,
  useRef,
} from "../base";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.changeTheme);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const ref = useRef();
  const closeMenu = () => {
    if (window.innerWidth < 992) {
      ref.current.click();
    }
  };
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${
        darkTheme ? "dark" : "light"
      } bg-${darkTheme ? "dark" : "light"}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Quiziz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={ref}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/joinquiz" onClick={closeMenu}>
                Join Quiz
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createquiz" onClick={closeMenu}>
                Create Quiz
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myquizcodes" onClick={closeMenu}>
                My Quiz Codes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/mysubmissions"
                onClick={closeMenu}
              >
                My Submissions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center justify-centent-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                onClick={() => {
                  dispatch(toggleTheme(darkTheme));
                  dispatch(toggleStyle(darkTheme));
                }}
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className={`form-check-label ${darkTheme ? "text-light" : ""}`}
                htmlFor="flexSwitchCheckDefault"
              >
                Dark Mode
              </label>
            </div>
            <Link
              className="nav-link"
              to={loggedIn ? "/" : "/signin"}
              onClick={closeMenu}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (loggedIn) {
                    signOut();
                    dispatch(logout());
                    dispatch(
                      setAlert({ type: "Success", message: "Signed Out" })
                    );
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {loggedIn ? "Sign Out" : "Sign In"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}