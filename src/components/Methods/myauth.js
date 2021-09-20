const signIn = async (credentials) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const data = await response.json();
  return data;
};

const signOut = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  sessionStorage.removeItem("mySubmissions");
  sessionStorage.removeItem("myQuizcodes");
  localStorage.removeItem("auth-token");
};

const signUp = async (credentials) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/auth/createuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const data = await response.json();
  return data;
};

const userData = async (authToken) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/auth/getuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  const data = await response.json();
  if (data._id) {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userId", data._id);
    return true;
  } else {
    return false;
  }
};

export { signIn, signOut, signUp, userData };