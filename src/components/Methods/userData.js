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
    await localStorage.setItem("userName", data.name);
    await localStorage.setItem("userEmail", data.email);
    await localStorage.setItem("userId", data._id);
    return true;
  } else {
    return false;
  }
};

export default userData;
