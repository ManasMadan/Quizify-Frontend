import {
  useSelector,
  useEffect,
  useState,
  fetchallquizcodes,
  QuizCodeElement,
  archivequizcode,
  unarchivequizcode,
  useDispatch,
  setLoading,
  setAlert,
} from "../../base";

export default function MyQuizCodes() {
  const [quizCodesArray, setquizCodesArray] = useState([]);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = localStorage.getItem("auth-token");
  const dispatch = useDispatch();

  const fetchQuizCodes = async (authToken) => {
    dispatch(setLoading(true));
    if (authToken) {
      const data = await fetchallquizcodes(authToken);
      setquizCodesArray(data);
    }
    dispatch(setLoading(false));
  };

  const archiveQuizCode = async (authToken, quizcode) => {
    dispatch(setLoading(true));
    archivequizcode(authToken, quizcode);
    const newQuizCodesArray = quizCodesArray;
    newQuizCodesArray.forEach((code) => {
      if (code.quizcode === quizcode) {
        code.deleted = true;
      }
    });
    setquizCodesArray([...newQuizCodesArray]);
    sessionStorage.setItem("myQuizcodes", JSON.stringify(newQuizCodesArray));
    dispatch(setLoading(false));
  };

  const unarchiveQuizCode = async (authToken, quizcode) => {
    dispatch(setLoading(true));
    unarchivequizcode(authToken, quizcode);
    const newQuizCodesArray = quizCodesArray;
    newQuizCodesArray.forEach((code) => {
      if (code.quizcode === quizcode) {
        code.deleted = false;
      }
    });
    setquizCodesArray([...newQuizCodesArray]);
    sessionStorage.setItem("myQuizcodes", JSON.stringify(newQuizCodesArray));
    dispatch(setLoading(false));
  };

  const shareQuizCode = async (quizcode) => {
    try {
      await navigator.share({
        title: `Join Quiz by ${localStorage.getItem(
          "userName"
        )} - QuizCode ${quizcode}`,
        url: "",
      });
    } catch (err) {
      dispatch(
        setAlert({ type: "Success", message: "Message Copied to Clipboard" })
      );
      navigator.clipboard.writeText(
        `To Attempt The Quiz, Go to ${process.env.REACT_APP_URL} and navigate to join quiz option and enter the code ${quizcode}`
      );
    }
  };

  useEffect(() => {
    fetchQuizCodes(authToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loggedIn) {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <h2>Sign In To Continue</h2>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2>Your Quiz Codes</h2>
        <div className="container d-flex align-items-center justify-content-center flex-wrap">
          <div className="container d-flex align-items-center justify-content-center">
            <h4>Quizcodes</h4>
          </div>
          {quizCodesArray.map((quizcode) => {
            return (
              <QuizCodeElement
                key={quizcode._id}
                quizcode={quizcode}
                method={quizcode.deleted ? unarchiveQuizCode : archiveQuizCode}
                shareQuizCode={shareQuizCode}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
