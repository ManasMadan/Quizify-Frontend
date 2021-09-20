const createsubmission = async (
  authToken,
  quizcode,
  answers,
  totalMarks,
  marksAwarded,
  email,
  name
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
      name,
    }),
  });

  const data = await response.json();
  return data;
};

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

const fetchallusersubmissions = async (authToken) => {
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

export {
  createsubmission,
  createsubmittedby,
  fetchallusersubmissions,
  fetchallquizcodesubmissions,
};
