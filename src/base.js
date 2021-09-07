// Modules
import { React, useState, useEffect } from "react";
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
import About from "./components/About";
import CreateQuiz from "./components/CreateQuiz";
import CreateQuizQuestions from "./components/CreateQuizQuestions";
import JoinQuizQuestions from "./components/JoinQuizQuestions";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import JoinQuiz from "./components/JoinQuiz";
import MyQuizCodes from "./components/MyQuizCodes";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";

// Methods - Auth, QuizCode, Questions
import createquizcode from "./components/Methods/createquizcode";
import joinquizcode from "./components/Methods/joinquizcode";
import fetchallquizcodes from "./components/Methods/fetchallquizcodes";
import signIn from "./components/Methods/signIn";
import signOut from "./components/Methods/signOut";
import signUp from "./components/Methods/signUp";
import userData from "./components/Methods/userData";

// Redux Actions
import toggleTheme from "./actions/darkThemeActions";
import toggleStyle from "./actions/styleActions";
import login from "./actions/loginActions";
import setAlert from "./actions/alertActions";
import logout from "./actions/logoutActions";

// Declaring cookies and authToken
const cookies = new Cookies();

// Single Export
export {
  React,
  useState,
  useHistory,
  useEffect,
  Router,
  Link,
  Switch,
  Route,
  Navbar,
  useParams,
  Home,
  About,
  SignIn,
  SignUp,
  JoinQuiz,
  CreateQuiz,
  joinquizcode,
  MyQuizCodes,
  CreateQuizQuestions,
  Error404,
  userData,
  JoinQuizQuestions,
  Alert,
  useSelector,
  useDispatch,
  login,
  logout,
  setAlert,
  toggleStyle,
  toggleTheme,
  createquizcode,
  fetchallquizcodes,
  signIn,
  signOut,
  signUp,
  cookies,
};
