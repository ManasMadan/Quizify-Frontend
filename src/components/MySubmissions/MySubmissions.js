import {
  MySubmissionsItem,
  useState,
  useEffect,
  fetchallmysubmissions,
  cookies,
  useSelector,
} from "../../base";

export default function MySubmissions() {
  const authToken = cookies.get("auth-token");
  const loggedIn = useSelector((state) => state.changeLoginState);
  const [mySubmissions, setMySubmissions] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetchallmysubmissions(authToken);
    setMySubmissions(res);
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
        <h2>My Submissions</h2>
        <div className="container d-flex align-items-center justify-content-center flex-wrap">
          {mySubmissions.map((question) => (
            <MySubmissionsItem question={question} />
          ))}
        </div>
      </div>
    );
  }
}
