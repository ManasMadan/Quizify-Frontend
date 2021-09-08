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

export default createquestion;
