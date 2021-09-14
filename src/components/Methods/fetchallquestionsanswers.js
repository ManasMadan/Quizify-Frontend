const fetchallquestionsanswers = async (authToken, quizcode, userId) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/questions/fetchallquestionanswers/${quizcode}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
};

export default fetchallquestionsanswers;
