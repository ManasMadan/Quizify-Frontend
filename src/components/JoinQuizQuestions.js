import { useParams } from "../base";

export default function JoinQuizQuestions() {
  const { quizcode } = useParams();
  return (
    <div className="container">
      <h5 style={{ textAlign: "center" }}>QuizCode : {quizcode}</h5>
    </div>
  );
}
