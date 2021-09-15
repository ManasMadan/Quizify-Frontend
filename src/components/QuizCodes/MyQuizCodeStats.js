import {
  useParams,
  useEffect,
  useHistory,
  useState,
  fetchallquizcodesubmissions,
  useSelector,
} from "../../base";

export default function MyQuizCodeStats() {
  const style = useSelector((state) => state.changeStyle);
  const { quizcode } = useParams();
  const history = useHistory();
  const [submissions, setSubmissions] = useState([]);
  const authToken = localStorage.getItem("auth-token");

  useEffect(async () => {
    const data = await fetchallquizcodesubmissions(authToken, quizcode);
    setSubmissions(data);
  }, []);

  useEffect(() => {
    const myquizcodesSessionStorage = JSON.parse(
      sessionStorage.getItem("myQuizcodes")
    );
    if (!myquizcodesSessionStorage) {
      history.push("/");
      return;
    }
    for (let i = 0; i < myquizcodesSessionStorage.length; i++) {
      const element = myquizcodesSessionStorage[i];
      if (element.quizcode === quizcode) {
        return;
      }
    }
    history.push("/");
  }, []);

  let i = 1;
  if (submissions === []) {
    return <h2>Loading</h2>;
  } else {
    return (
      <div
        className="container submissionsTable"
        style={{ overflowX: "scroll" }}
      >
        <table class="table" style={style}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Marks</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              return (
                <tr key={submission._id}>
                  <th scope="row">{i++}</th>
                  <td>{submission.name}</td>
                  <td>{submission.email}</td>
                  <td>{submission.marksAwarded}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
