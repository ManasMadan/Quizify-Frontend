import { useSelector, Link } from "../../base";

export default function MySubmissionsItem(props) {
  const style = useSelector((state) => state.changeStyle);
  const dateObj = new Date(props.question.Date);

  return (
    <div
      className="card mx-3 my-3"
      style={{ ...style, border: `2px solid ${style.color}`, width: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{props.question.quizcode}</h5>
        <p className="card-text">
          Submitted On{" "}
          {`${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`}
        </p>
        <Link
          to={`mysubmissions/${props.question.quizcode}`}
          className="btn btn-primary"
        >
          See Marks
        </Link>
      </div>
    </div>
  );
}
