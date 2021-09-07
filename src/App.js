import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import JoinQuiz from "./components/JoinQuiz";
import CreateQuiz from "./components/CreateQuiz";
import MyQuizCodes from "./components/MyQuizCodes";
import CreateQuizQuestions from "./components/CreateQuizQuestions";
import Error404 from "./components/Error404";
import { useSelector } from "react-redux";

export default function App() {
  const style = useSelector((state) => state.changeStyle);

  useEffect(() => {
    document.body.style.backgroundColor = style.backgroundColor;
    document.body.style.color = style.color;
  }, [style]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/signin">
          <SignIn />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/createquiz">
          <CreateQuiz />
        </Route>

        <Route exact path="/createquiz/:quizcode">
          <CreateQuizQuestions />
        </Route>

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
