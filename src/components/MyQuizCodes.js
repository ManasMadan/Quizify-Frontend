import {
  useSelector,
  useEffect,
  useState,
  fetchallquizcodes,
  cookies,
  QuizCodeElement,
  deletequizcode,
} from "../base";

export default function MyQuizCodes() {
  const [quizCodesArray, setquizCodesArray] = useState([]);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");

  const fetchQuizCodes = async (authToken) => {
    const data = (await fetchallquizcodes(authToken)).quizcodes;
    setquizCodesArray(data);
  };

  const deleteCode = async (authToken, quizcode) => {
    deletequizcode(authToken, quizcode);
    const newQuizCodesArray = quizCodesArray.filter(
      (code) => code.quizcode !== quizcode
    );
    setquizCodesArray(newQuizCodesArray);
  };

  useEffect(() => {
    fetchQuizCodes(authToken);
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
          {quizCodesArray.map((quizcode) => {
            return (
              <QuizCodeElement quizcode={quizcode} deleteCode={deleteCode} />
            );
          })}
        </div>
      </div>
    );
  }
}
