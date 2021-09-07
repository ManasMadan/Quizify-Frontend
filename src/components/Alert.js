import { useDispatch, useSelector, setAlert } from "../base";

export default function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.changeAlert);

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          style={{ borderRadius: "0px" }}
          className={`alert alert-${alert.type.toLowerCase()} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => dispatch(setAlert(null))}
          ></button>
        </div>
      )}
    </div>
  );
}
