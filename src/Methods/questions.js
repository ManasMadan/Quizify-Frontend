const createquestion = async (authToken, question) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/questions/addquestion`;
  let newQuestion = question;
  if (
    question.questionType === "MCQ" ||
    question.questionType === "CheckBoxes"
  ) {
    if (question.questionOptions.length === 0) {
      return { error: "Add Atleast A Option" };
    }
  }
  if (newQuestion.questionOptions.length === 0) {
    delete newQuestion.questionOptions;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify(newQuestion),
  });

  const data = await response.json();
  return data;
};

const deletequestion = async (authToken, questionId) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/questions/delete/${questionId}`;
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

const editquestion = async (authToken, id, question) => {
  if (question.questionMarks === 0) {
    question.correctAnswers = [];
  }

  if (
    question.questionType === "MCQ" ||
    question.questionType === "CheckBoxes"
  ) {
    question.correctAnswers = question.correctAnswers.filter((e) =>
      question.questionOptions.includes(e)
    );
  }

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

const fetchallquestions = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/questions/fetchallquestions/${quizcode}`;
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

export {
  createquestion,
  deletequestion,
  editquestion,
  fetchallquestions,
  fetchallquestionsanswers,
};
