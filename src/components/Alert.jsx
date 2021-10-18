import { useDispatch, useSelector, setAlert } from "../base";

// This Component is Shown When Alert Redux State Is Not null
export default function Alert() {
  // Dispatch
  const dispatch = useDispatch();
  // Alert Redux State
  const alert = useSelector((state) => state.changeAlert);

  return (
    <div className="mb-3" style={{ height: "50px" }}>
      {alert && (
        <div
          style={{ borderRadius: "0px" }}
          className={`alert alert-${alert.type.toLowerCase()} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          {/* Alert Dismiss Button */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => dispatch(setAlert(null))}
          ></button>
        </div>
      )}
    </div>
  );
}
