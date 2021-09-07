import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "./index";
import Cookies from "universal-cookie";
import { login, logout } from "../actions/index";

export default function SignUp() {
  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5" style={style}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          aria-describedby="emailHelp"
          value={credentials.name}
          onChange={onChange}
          style={style}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          style={style}
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
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          style={style}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          const data = await signUp(credentials);
          if (data.authtoken) {
            cookies.set("auth-token", data.authtoken);
            dispatch(login());
          } else {
            dispatch(logout());
            cookies.remove("auth-token");
          }
        }}
      >
        SignUp
      </button>
      <span className="mx-2">or</span>
      <Link
        to="/signin"
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        SignIn
      </Link>
    </div>
  );
}
