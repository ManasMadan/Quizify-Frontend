const fetchallmysubmissions = async (authToken) => {
  const submissions = sessionStorage.getItem("mySubmissions");
  if (submissions) {
    return JSON.parse(submissions);
  }

  const url = `${process.env.REACT_APP_API_HOST_URL}/api/submissions/getallsubmissions`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  if (authToken) {
    sessionStorage.setItem("mySubmissions", JSON.stringify(data));
  }
  return data;
};

export default fetchallmysubmissions;
