const fetchallquizcodes = async (authToken) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/getallquizcodes`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  return data;
};

export default fetchallquizcodes;
