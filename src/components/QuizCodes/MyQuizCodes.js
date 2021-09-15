import {
  useSelector,
  useEffect,
  useState,
  fetchallquizcodes,
  cookies,
  QuizCodeElement,
  deletequizcode,
  undeletequizcode,
} from "../../base";

export default function MyQuizCodes() {
  const [quizCodesArray, setquizCodesArray] = useState([]);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");

  const fetchQuizCodes = async (authToken) => {
    if (authToken) {
      const data = await fetchallquizcodes(authToken);
      setquizCodesArray(data);
    }
  };

  const deleteCode = async (authToken, quizcode) => {
    deletequizcode(authToken, quizcode);
    const newQuizCodesArray = quizCodesArray;
    newQuizCodesArray.forEach((code) => {
      if (code.quizcode === quizcode) {
        code.deleted = true;
      }
    });
    setquizCodesArray([...newQuizCodesArray]);
    sessionStorage.setItem("myQuizcodes", JSON.stringify(newQuizCodesArray));
  };

  const undeleteCode = async (authToken, quizcode) => {
    undeletequizcode(authToken, quizcode);
    const newQuizCodesArray = quizCodesArray;
    newQuizCodesArray.forEach((code) => {
      if (code.quizcode === quizcode) {
        code.deleted = false;
      }
    });
    setquizCodesArray([...newQuizCodesArray]);
    sessionStorage.setItem("myQuizcodes", JSON.stringify(newQuizCodesArray));
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
                method={quizcode.deleted ? undeleteCode : deleteCode}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
