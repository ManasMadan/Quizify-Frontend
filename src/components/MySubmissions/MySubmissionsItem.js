import { useSelector, Link } from "../../base";

export default function MySubmissionsItem(props) {
  const style = useSelector((state) => state.changeStyle);
  const dateObj = new Date(props.submission.Date);

  return (
    <div
      className="card mx-3 my-3"
      style={{ ...style, border: `2px solid ${style.color}`, width: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{props.submission.quizcode}</h5>
        <p className="card-text">
          Submitted On{" "}
          {`${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`}
        </p>
        <p className="card-text">
          Marks Obtained : {props.submission.marksAwarded} /{" "}
          {props.submission.totalMarks}
        </p>
        <Link
          to={`mysubmissions/${props.submission.quizcode}`}
          className="btn btn-primary"
        >
          See Result
        </Link>
      </div>
    </div>
  );
}
