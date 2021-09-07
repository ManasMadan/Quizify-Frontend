import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  About,
  SignIn,
  SignUp,
  JoinQuiz,
  CreateQuiz,
  MyQuizCodes,
  CreateQuizQuestions,
  Error404,
  userData,
  JoinQuizQuestions,
  Alert,
} from "./components/index";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./actions/index";
import Cookies from "universal-cookie";

export default function App() {
  const cookies = new Cookies();
  const style = useSelector((state) => state.changeStyle);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = style.backgroundColor;
    document.body.style.color = style.color;
  }, [style]);

  useEffect(() => {
    const authToken = cookies.get("auth-token");
    if (authToken) {
      if (userData(authToken)) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }, [loggedIn]);

  return (
    <Router>
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        {!loggedIn && (
          <Route exact path="/signin">
            <SignIn />
          </Route>
        )}
        {!loggedIn && (
          <Route exact path="/signup">
            <SignUp />
          </Route>
        )}

        <Route exact path="/createquiz">
          <CreateQuiz />
        </Route>

        {loggedIn && (
          <Route exact path="/createquiz/:quizcode">
            <CreateQuizQuestions />
          </Route>
        )}

        {loggedIn && (
          <Route exact path="/joinquiz/:quizcode">
            <JoinQuizQuestions />
          </Route>
        )}

        <Route exact path="/joinquiz">
          <JoinQuiz />
        </Route>

        <Route exact path="/myquizcodes">
          <MyQuizCodes />
        </Route>

        <Route>
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

/*
<div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
        <button type="submit" onClick={signUp} className="btn btn-outline-success">Sign Up</button>
        </form>
      </div>
*/
