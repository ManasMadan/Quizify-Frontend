import {
  MySubmissionsItem,
  useState,
  useEffect,
  fetchallmysubmissions,
  useSelector,
  useDispatch,
  setLoading,
} from "../../base";
import LoaderComponent from "../LoaderComponent";

export default function MySubmissions() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("auth-token");
  const loggedIn = useSelector((state) => state.changeLoginState);
  const [mySubmissions, setMySubmissions] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    const myfunction = async () => {
      if (authToken) {
        const res = await fetchallmysubmissions(authToken);
        setMySubmissions(res);
      }
    };
    myfunction();
    dispatch(setLoading(false));
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
          {mySubmissions.map((submission) => (
            <MySubmissionsItem submission={submission} />
          ))}
        </div>
      </div>
    );
  }
}
