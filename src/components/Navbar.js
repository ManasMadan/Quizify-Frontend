import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../actions/darkThemeActions";
import { toggleStyle } from "../actions/styleActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.changeTheme);

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
              <Link className="nav-link" to="/signin">
                Sign In
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
          <div className="d-flex">
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
