import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./index";
import Cookies from "universal-cookie";
import { login, logout } from "../actions/index";

export default function SignIn() {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const style = useSelector((state) => state.changeStyle);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

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
          name="email"
          value={credentials.email}
          onChange={onChange}
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
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          style={style}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          const data = await signIn(credentials);
          if (data.authtoken) {
            cookies.set("auth-token", data.authtoken);
            dispatch(login());
          } else {
            dispatch(logout());
            cookies.remove("auth-token");
          }
        }}
      >
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
