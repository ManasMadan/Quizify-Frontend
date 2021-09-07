import { useSelector } from "../../base";

export default function Question(props) {
  const { questionStatement, questionMarks, questionType } = props.question;
  const style = useSelector((state) => state.changeStyle);

  return (
    <div class="card my-3 position-relative">
      <div class="card-body" style={style}>
        <h5 class="card-title">{questionStatement}</h5>
        <br />
        <div class="mb-3">
          {questionType === "ShortAnswer" ? (
            <input
              type="email"
              class="form-control"
              id="answer"
              aria-describedby="emailHelp"
            />
          ) : (
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
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
