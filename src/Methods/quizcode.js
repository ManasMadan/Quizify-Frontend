const checkquizcode = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/check/${quizcode}`;
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
    sessionStorage.setItem("myQuizcodes", JSON.stringify(data.quizcodes));
  }
  return data.quizcodes;
};

const archivequizcode = async (authToken, quizcode) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/quizcode/delete/${quizcode}`;
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

const unarchivequizcode = async (authToken, quizcode) => {
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

export {
  checkquizcode,
  createquizcode,
  fetchallquizcodes,
  archivequizcode,
  unarchivequizcode,
};
