import {
  React,
  useEffect,
  Router,
  Switch,
  Route,
  useState,
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
  JoinQuizQuestions,
  Alert,
  useSelector,
  userData,
  useDispatch,
  login,
  logout,
  setAlert,
  MySubmissions,
  MyQuizSubmission,
  MyQuizCodeStats,
  Loading,
  Offline,
} from "./base";

export default function App() {
  // Redux States
  const style = useSelector((state) => state.changeStyle);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const alert = useSelector((state) => state.changeAlert);
  const loading = useSelector((state) => state.changeLoading);
  // Auth-Token To Be Sent in Headers
  const authToken = localStorage.getItem("auth-token");
  // Online State
  const [online, setOnline] = useState(true);
  // useDispatch
  const dispatch = useDispatch();

  // Change Theme On Style Variable Change
  useEffect(() => {
    document.body.style.backgroundColor = style.backgroundColor;
    document.body.style.color = style.color;
  }, [style]);

  // Hide Alert After 2 seconds
  useEffect(() => {
    if (alert !== {}) {
      setTimeout(() => {
        dispatch(setAlert(null));
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  // Clear Session Storage On Reload
  window.onbeforeunload = function () {
    sessionStorage.clear();
  };

  // Check Online / Offline Status
  window.addEventListener("load", () => {
    function handleNetworkChange(event) {
      if (navigator.onLine) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
  });
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // Change Login Redux State
  useEffect(() => {
    const myFunc = async () => {
      if (authToken) {
        const data = await userData(authToken);
        if (data) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    };
    myFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // Show Overlay On Loading
  useEffect(() => {
    // document.getElementById("overlay").style.display = loading
    //   ? "block"
    //   : "none";
  }, [loading]);

  if (!online) {
    return <Offline />;
  } else {
    return (
      <Router>
        <Loading />
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

          <Route exact path="/createquiz/:quizcode">
            <CreateQuizQuestions />
          </Route>

          <Route exact path="/joinquiz/:quizcode">
            <JoinQuizQuestions />
          </Route>

          <Route exact path="/joinquiz">
            <JoinQuiz />
          </Route>

          <Route exact path="/myquizcodes">
            <MyQuizCodes />
          </Route>

          <Route exact path="/mysubmissions">
            <MySubmissions />
          </Route>

          <Route exact path="/mysubmissions/:quizcode">
            <MyQuizSubmission />
          </Route>

          <Route exact path="/myquizcodes/:quizcode">
            <MyQuizCodeStats />
          </Route>

          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    );
  }
}
