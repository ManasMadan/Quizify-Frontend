const createsubmission = async (
  authToken,
  quizcode,
  answers,
  totalMarks,
  marksAwarded,
  email
) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/submissions/createsubmission`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify({
      quizcode,
      answers,
      totalMarks,
      marksAwarded,
      email,
    }),
  });

  const data = await response.json();
  return data;
};

export default createsubmission;
