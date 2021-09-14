const undeletequizcode = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/undelete/${quizcode}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  return data;
};

export default undeletequizcode;
