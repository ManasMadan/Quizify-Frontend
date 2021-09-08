import { useSelector } from "../../base";

export default function Question(props) {
  const {
    questionStatement,
    questionMarks,
    questionOptions,
    questionType,
    _id,
  } = props.question;
  const style = useSelector((state) => state.changeStyle);
  return (
    <div className="card my-3 position-relative">
      <div className="card-body" style={style}>
        <h5 className="card-title">{questionStatement}</h5>
        <br />
        <div className="mb-3 d-flex flex-column">
          {questionType === "MCQ" ? (
            <div className="d-flex flex-column">
              {questionOptions.map((e) => {
                return (
                  <>
                    <span>
                      <input
                        className="form-check-input mx-3"
                        type="radio"
                        name={`option${_id}`}
                        id={`option${_id}`}
                      />
                      {e}
                    </span>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="d-flex flex-column">
              {questionOptions.map((e) => {
                return (
                  <>
                    <span>
                      <input
                        className="form-check-input mx-3"
                        type="checkbox"
                        name={`option${_id}`}
                        id={`option${_id}`}
                      />
                      {e}
                    </span>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
        }}
      >
        <span className="badge bg-danger" style={{ borderRadius: 0 }}>
          {questionMarks}
        </span>
      </div>
    </div>
  );
}
