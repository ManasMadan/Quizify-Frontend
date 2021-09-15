import { useParams, useEffect } from "../../base";

export default function MyQuizCodeStats() {
  const { quizcode } = useParams();

  useEffect(() => {
    localStorage.getItem();
  }, []);

  return (
    <div>
      <h2>{quizcode}</h2>
    </div>
  );
}
