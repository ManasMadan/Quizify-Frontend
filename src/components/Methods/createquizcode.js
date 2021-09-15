const createquizcode = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/createquizcode`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify({ quizcode }),
  });
  const data = await response.json();
  if (authToken && data.quizcode) {
    sessionStorage.setItem(
      "myQuizcodes",
      JSON.stringify(
        (JSON.parse(sessionStorage.getItem("myQuizcodes")) || []).concat(data)
      )
    );
  }
  return data;
};

export default createquizcode;
