const createsubmittedby = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/submissions/createsubmittedby`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify({ quizcode }),
  });

  const data = await response.json();
  return data;
};

export default createsubmittedby;
