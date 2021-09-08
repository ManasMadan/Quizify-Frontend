const editquestion = async (authToken, id, question) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/questions/updatequestion/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify(question),
  });
  const data = await response.json();
  return data;
};

export default editquestion;
