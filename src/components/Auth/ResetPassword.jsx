import {
  useParams,
  useSelector,
  useDispatch,
  useState,
  useHistory,
  setLoading,
  setAlert,
  resetPasswordUsingEmail,
} from "../../base";

export default function ResetPassword() {
  const { token } = useParams();

  const style = useSelector((state) => state.changeStyle);
  const dispatch = useDispatch();
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
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
          <label htmlFor="newPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={credentials.newPassword}
            onChange={onChange}
            style={style}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="currentNewpassword"
            name="confirmNewPassword"
            value={credentials.confirmNewPassword}
            onChange={onChange}
            style={style}
            autoComplete="new-password"
          />
        </div>
      </form>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={async () => {
          dispatch(setLoading(true));
          if (credentials.newPassword !== credentials.confirmNewPassword) {
            dispatch(
              setAlert({ type: "Danger", message: "Passwords Must be Same" })
            );
            dispatch(setLoading(false));
            return;
          }

          const data = await resetPasswordUsingEmail(
            credentials.email,
            credentials.newPassword,
            token
          );

          if (data.success) {
            dispatch(
              setAlert({
                type: "success",
                message: "Password Changed Successfully",
              })
            );
            history.push("/");
          } else {
            dispatch(
              setAlert({
                type: "danger",
                message: data.error || data.errors[0].msg,
              })
            );
          }

          dispatch(setLoading(false));
        }}
      >
        Update Password
      </button>
    </div>
  );
}
