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
  // Dispatch
  const dispatch = useDispatch();
  // Style Redux State
  const style = useSelector((state) => state.changeStyle);
  // Logged In Redux State
  const loggedIn = useSelector((state) => state.changeLoginState);
  // ref for Habmurger Icon : Clicked When Inner Width < 992 i.e. Hamburger Icon Shown
  const ref = useRef();
  // Close Hamburger Menu When width is < 992
  const closeMenu = () => {
    if (window.innerWidth < 992) {
      ref.current.click();
    }
  };

  // Navbar Menus Array
  const navOptions = [
    ["Home", "/"],
    ["Join Quiz", "/joinquiz"],
    ["Create Quiz", "/createquiz"],
    ["My Quiz Codes", "/myquizcodes"],
    ["My Submissions", "/mysubmissions"],
    ["About", "/about"],
  ];

  // Dark Theme Toggle Handler
  const darkThemeToggleHandler = () => {
    dispatch(toggleTheme(style.color === "white"));
    dispatch(toggleStyle(style.color === "white"));
  };

  // Sign Out Handler
  const signOutHandler = () => {
    if (loggedIn) {
      signOut();
      dispatch(logout());
      dispatch(setAlert({ type: "Success", message: "Signed Out" }));
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${
        style.color === "white" ? "dark" : "light"
      } bg-${style.color === "white" ? "dark" : "light"}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Quizify
        </Link>
        {/* Hamburger Icon For Modile View */}
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
            {navOptions.map(([name, path]) => (
              <li className="nav-item">
                <Link className="nav-link" to={path} onClick={closeMenu}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center justify-centent-center">
            {/* Dark Mode Toggle Switch */}
            <div className="form-check form-switch">
              <input
                checked={style.color === "white"}
                className="form-check-input"
                onClick={darkThemeToggleHandler}
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className={`form-check-label ${
                  style.color === "white" ? "text-light" : ""
                }`}
                htmlFor="flexSwitchCheckDefault"
              >
                Dark Mode
              </label>
            </div>
            {/* Sign In Sign Out Button Showed Depending On Logged In State */}
            <Link
              className="nav-link"
              to={loggedIn ? "/" : "/signin"}
              onClick={closeMenu}
            >
              <button className="btn btn-primary" onClick={signOutHandler}>
                {loggedIn ? "Sign Out" : "Sign In"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
