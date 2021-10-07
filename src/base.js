// Modules
import { React, useState, useEffect, useRef } from "react";
import {
  HashRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// html2canvas
import html2canvas from "html2canvas";

// Number Format
import NumberFormat from "react-number-format";

// Draggable
import Draggable from "react-draggable";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Error404 from "./components/Error404/Error404";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

// Components - Auth
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import VerifyEmail from "./components/Auth/VerifyEmail";
// Components - Create Quiz
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import CreateQuizQuestions from "./components/CreateQuiz/CreateQuizQuestions";
// Components - Join Quiz
import JoinQuiz from "./components/JoinQuiz/JoinQuiz";
import JoinQuizQuestions from "./components/JoinQuiz/JoinQuizQuestions";
// Components - Quiz Code
import MyQuizCodes from "./components/QuizCodes/MyQuizCodes";
import MyQuizCodeStats from "./components/QuizCodes/MyQuizCodeStats";
import QuizCodeElement from "./components/QuizCodes/QuizCodeElement";
// Components - Question
import Question from "./components/Questions/Question";
import QuestionOption from "./components/Questions/QuestionOption";
import AddEditQuestion from "./components/Questions/AddEditQuestion";
// Components - Submissions
import MySubmissions from "./components/MySubmissions/MySubmissions";
import MySubmissionsItem from "./components/MySubmissions/MySubmissionsItem";
import MyQuizSubmission from "./components/MySubmissions/MyQuizSubmission";
// Components - Offline
import Offline from "./components/Offline";
// Components - Calculator
import Calculator from "./components/Calculator/Calculator";

// Methods - Auth
import {
  signIn,
  signUp,
  signOut,
  userData,
  verifyEmail,
} from "./Methods/myauth";
// Methods - QuizCode
import {
  createquizcode,
  fetchallquizcodes,
  archivequizcode,
  unarchivequizcode,
  checkquizcode,
} from "./Methods/quizcode";
// Methods - Questions
import {
  fetchallquestions,
  fetchallquestionsanswers,
  createquestion,
  deletequestion,
  editquestion,
} from "./Methods/questions";
// Methods - Submissions
import {
  createsubmission,
  createsubmittedby,
  fetchallusersubmissions,
  fetchallquizcodesubmissions,
} from "./Methods/submissions";

// Redux Actions
// Alert
import setAlert from "./actions/alertActions";
// Loading
import setLoading from "./actions/loadingActions";
// DarkTheme
import toggleTheme from "./actions/darkThemeActions";
import toggleStyle from "./actions/styleActions";
// Auth
import login from "./actions/loginActions";
import logout from "./actions/logoutActions";

// Single Export
export {
  // Modules - react
  React,
  useState,
  useEffect,
  useRef,
  // html2canvas
  html2canvas,
  // NumberFormat
  NumberFormat,
  // Draggable
  Draggable,
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
  // Components - Auth
  SignIn,
  SignUp,
  VerifyEmail,
  // Components - Create Quiz
  CreateQuiz,
  CreateQuizQuestions,
  // Components - Join Quiz
  JoinQuiz,
  JoinQuizQuestions,
  // Components - Quiz Code
  MyQuizCodes,
  QuizCodeElement,
  MyQuizCodeStats,
  // Components - Submissions
  MySubmissions,
  MySubmissionsItem,
  MyQuizSubmission,
  // Components - Offline
  Offline,
  // Components - Calculator
  Calculator,
  // Components
  Navbar,
  Home,
  About,
  Error404,
  Alert,
  Loading,
  // Redux Actions
  // Alert
  setAlert,
  // Loading
  setLoading,
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
  verifyEmail,
  // Methods - QuizCodes
  archivequizcode,
  unarchivequizcode,
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
  fetchallusersubmissions,
  fetchallquizcodesubmissions,
  createsubmittedby,
  // Components - Questions
  Question,
  AddEditQuestion,
  QuestionOption,
};
