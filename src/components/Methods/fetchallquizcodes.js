const fetchallquizcodes = async (authToken) => {
  const quizcodes = sessionStorage.getItem("myQuizcodes");
  if (quizcodes) {
    return JSON.parse(quizcodes);
  }

  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/getallquizcodes`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  if (authToken) {
    sessionStorage.setItem("myQuizcodes", JSON.stringify(data));
  }
  return data.quizcodes;
};

export default fetchallquizcodes;
