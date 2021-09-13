import {
  useState,
  Link,
  useHistory,
  useSelector,
  useDispatch,
  signIn,
  cookies,
  login,
  logout,
  setAlert,
} from "../../base";

export default function SignIn() {
  const dispatch = useDispatch();
  let history = useHistory();

  const style = useSelector((state) => state.changeStyle);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5" style={style}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          style={style}
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text" style={style}>
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          style={style}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          const data = await signIn(credentials);
          if (data.authtoken) {
            cookies.set("auth-token", data.authtoken);
            dispatch(login());
            dispatch(setAlert({ type: "Success", message: "Signed In" }));
            window.scrollTo({ top: 0, behavior: "smooth" });

            window.scrollTo({ top: 0, behavior: "smooth" });
            history.push("/");
            dispatch(
              setAlert({ type: "Success", message: "Succesfully Signed In" })
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            dispatch(logout());
            cookies.remove("auth-token");
            dispatch(
              setAlert({
                type: "Danger",
                message: data.error || data.errors[0].msg,
              })
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        SignIn
      </button>
      <span className="mx-2">or</span>
      <Link
        to="/signup"
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        SignUp
      </Link>
    </div>
  );
}
