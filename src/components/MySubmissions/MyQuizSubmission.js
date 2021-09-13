import {
  useState,
  useEffect,
  useParams,
  fetchallmysubmissions,
  cookies,
} from "../../base";

export default function MyQuizSubmission() {
  const { quizcode } = useParams();
  const authToken = cookies.get("auth-token");
  const [submission, setSubmission] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetchallmysubmissions(authToken);
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      if (element.quizcode === quizcode) {
        setSubmission(element);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-container justify-content-center">
        <h3>Quizcode : {quizcode}</h3>
      </div>
      {JSON.stringify(submission)}
    </div>
  );
}
