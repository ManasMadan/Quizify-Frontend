import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignIn() {
  const style = useSelector((state) => state.changeStyle);

  return (
    <div className="container my-5" style={style}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          style={style}
        />
        <div id="emailHelp" className="form-text" style={style}>
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          style={style}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        SignIn
      </button>
      <span className="mx-2">or</span>
      <Link
        to="/signup"
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        SignUp
      </Link>
    </div>
  );
}