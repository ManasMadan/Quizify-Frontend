import {
  useSelector,
  useEffect,
  useState,
  fetchallquizcodes,
  cookies,
} from "../base";

export default function MyQuizCodes() {
  const [quizCodesArray, setquizCodesArray] = useState([]);
  const loggedIn = useSelector((state) => state.changeLoginState);
  const authToken = cookies.get("auth-token");

  const fetchQuizCodes = async (authToken) => {
    const data = (await fetchallquizcodes(authToken)).quizcodes;
    console.log(data);
    setquizCodesArray(data);
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
        {quizCodesArray.map((quizcode) => {
          return <h4>{quizcode.quizcode}</h4>;
        })}
      </div>
    );
  }
}
