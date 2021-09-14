// Modules
import { React, useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Error404 from "./components/Error404";
import Alert from "./components/Alert";

// Components - Auth
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
// Components - Create Quiz
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import CreateQuizQuestions from "./components/CreateQuiz/CreateQuizQuestions";
// Components - Join Quiz
import JoinQuiz from "./components/JoinQuiz/JoinQuiz";
import JoinQuizQuestions from "./components/JoinQuiz/JoinQuizQuestions";
// Components - Quiz Code
import MyQuizCodes from "./components/QuizCodes/MyQuizCodes";
import QuizCodeElement from "./components/QuizCodes/QuizCodeElement";
// Components - Question
import Question from "./components/Questions/Question";
import QuestionOption from "./components/Questions/QuestionOption";
import AddEditQuestion from "./components/Questions/AddEditQuestion";
// Components - Submissions
import MySubmissions from "./components/MySubmissions/MySubmissions";
import MySubmissionsItem from "./components/MySubmissions/MySubmissionsItem";
import MyQuizSubmission from "./components/MySubmissions/MyQuizSubmission";

// Methods - Auth
import signIn from "./components/Methods/signIn";
import signOut from "./components/Methods/signOut";
import signUp from "./components/Methods/signUp";
import userData from "./components/Methods/userData";
// Methods - QuizCode
import createquizcode from "./components/Methods/createquizcode";
import joinquizcode from "./components/Methods/joinquizcode";
import fetchallquizcodes from "./components/Methods/fetchallquizcodes";
import deletequizcode from "./components/Methods/deletequizcode";
import undeletequizcode from "./components/Methods/undeletequizcode";
import checkquizcode from "./components/Methods/checkquizcode";
// Methods - Questions
import fetchallquestions from "./components/Methods/fetchallquestions";
import fetchallquestionsanswers from "./components/Methods/fetchallquestionsanswers";
import createquestion from "./components/Methods/createquestion";
import deletequestion from "./components/Methods/deletequestion";
import editquestion from "./components/Methods/editquestion";
// Methods - Submissions
import createsubmission from "./components/Methods/createsubmission";
import createsubmittedby from "./components/Methods/createsubmittedby";
import fetchallmysubmissions from "./components/Methods/fetchallmysubmissions";

// Redux Actions
// Alert
import setAlert from "./actions/alertActions";
// DarkTheme
import toggleTheme from "./actions/darkThemeActions";
import toggleStyle from "./actions/styleActions";
// Auth
import login from "./actions/loginActions";
import logout from "./actions/logoutActions";

// Declaring cookies
const cookies = new Cookies();

// Single Export
export {
  // Modules - react
  React,
  useState,
  useEffect,
  useRef,
  // Modules - react-router-dom
  Router,
  Link,
  Switch,
  Route,
  useHistory,
  useParams,
  // Modules - react-redux
  useSelector,
  useDispatch,
  // Modules - Cookie
  cookies,
  // Components - Auth
  SignIn,
  SignUp,
  // Components - Create Quiz
  CreateQuiz,
  CreateQuizQuestions,
  // Components - Join Quiz
  JoinQuiz,
  JoinQuizQuestions,
  // Components - Quiz Code
  MyQuizCodes,
  QuizCodeElement,
  // Components - Submissions
  MySubmissions,
  MySubmissionsItem,
  MyQuizSubmission,
  // Components
  Navbar,
  Home,
  About,
  Error404,
  Alert,
  // Redux Actions
  // Alert
  setAlert,
  // Dark Theme
  toggleStyle,
  toggleTheme,
  // Auth
  login,
  logout,
  // Methods - Auth
  signIn,
  signOut,
  signUp,
  userData,
  // Methods - QuizCodes
  joinquizcode,
  deletequizcode,
  undeletequizcode,
  createquizcode,
  fetchallquizcodes,
  checkquizcode,
  // Methods - Questions
  fetchallquestions,
  fetchallquestionsanswers,
  createquestion,
  deletequestion,
  editquestion,
  // Methods - Submissions
  createsubmission,
  fetchallmysubmissions,
  createsubmittedby,
  // Components - Questions
  Question,
  AddEditQuestion,
  QuestionOption,
};
