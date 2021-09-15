const fetchallquizcodesubmissions = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/submissions/quizcodesubmissions/${quizcode}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  return response.json();
};

export default fetchallquizcodesubmissions;
