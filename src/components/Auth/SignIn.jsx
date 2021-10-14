import {
  useState,
  Link,
  useHistory,
  useSelector,
  useDispatch,
  signIn,
  login,
  logout,
  setAlert,
  setLoading,
  sendVerificationEmail,
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
      <form>
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          dispatch(setLoading(true));
          const data = await signIn(credentials);
          if (data.authtoken) {
            localStorage.setItem("auth-token", data.authtoken);
            dispatch(login());
            dispatch(setAlert({ type: "Success", message: "Signed In" }));
            history.push("/");
            dispatch(
              setAlert({ type: "Success", message: "Succesfully Signed In" })
            );
          } else {
            dispatch(logout());
            localStorage.removeItem("auth-token");
            if (data.error === "Verify Email To Continue") {
              const res = await sendVerificationEmail(credentials.email);
              if (res.success) {
                dispatch(
                  setAlert({
                    type: "Danger",
                    message: "Verify Email To Continue - Link Sent",
                  })
                );
              }
            } else {
              dispatch(
                setAlert({
                  type: "Danger",
                  message: data.error || data.errors[0].msg,
                })
              );
            }
          }
          dispatch(setLoading(false));
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
