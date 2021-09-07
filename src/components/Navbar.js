import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleStyle, logout } from "../actions/index";
import Cookies from "universal-cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.changeTheme);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const cookies = new Cookies();

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${
        darkTheme ? "dark" : "light"
      } bg-${darkTheme ? "dark" : "light"}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/joinquiz">
                Join Quiz
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createquiz">
                Create Quiz
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myquizcodes">
                My Quiz Codes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="position-absolute d-flex align-items-center justify-centent-center top-0 end-0">
            <Link className="nav-link" to={loggedIn ? "/signout" : "/signin"}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (loggedIn) {
                    dispatch(logout());
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userId");
                    cookies.remove("auth-token");
                  }
                }}
              >
                {loggedIn ? "Sign Out" : "Sign In"}
              </button>
            </Link>
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
          </div>
        </div>
      </div>
    </nav>
  );
}
