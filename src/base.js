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

// Methods - Auth
import { signIn, signUp, signOut, userData } from "./components/Methods/myauth";
// Methods - QuizCode
import {
  createquizcode,
  fetchallquizcodes,
  archivequizcode,
  unarchivequizcode,
  checkquizcode,
} from "./components/Methods/quizcode";
// Methods - Questions
import {
  fetchallquestions,
  fetchallquestionsanswers,
  createquestion,
  deletequestion,
  editquestion,
} from "./components/Methods/questions";
// Methods - Submissions
import {
  createsubmission,
  createsubmittedby,
  fetchallusersubmissions,
  fetchallquizcodesubmissions,
} from "./components/Methods/submissions";

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
