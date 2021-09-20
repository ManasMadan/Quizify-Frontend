import {
  useState,
  Link,
  useHistory,
  useSelector,
  useDispatch,
  signUp,
  login,
  logout,
  setAlert,
} from "../../base";

export default function SignUp() {
  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5" style={style}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          aria-describedby="emailHelp"
          value={credentials.name}
          onChange={onChange}
          style={style}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          style={style}
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
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          style={style}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={onChange}
          style={style}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          if (credentials.password !== credentials.confirmPassword) {
            dispatch(
              setAlert({ type: "Danger", message: "Passwords Must be Same" })
            );
            return;
          }
          const data = await signUp(credentials);
          if (data.authtoken) {
            localStorage.setItem("auth-token", data.authtoken);
            dispatch(login());
            dispatch(
              setAlert({ type: "Success", message: "Succesfully Signed Up" })
            );
            window.scrollTo({ top: 0, behavior: "smooth" });

            history.push("/");
          } else {
            dispatch(logout());
            localStorage.removeItem("auth-token");
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
        SignUp
      </button>
      <span className="mx-2">or</span>
      <Link
        to="/signin"
        className="btn btn-primary"
        style={{ textDecoration: "none" }}
      >
        SignIn
      </Link>
    </div>
  );
}
