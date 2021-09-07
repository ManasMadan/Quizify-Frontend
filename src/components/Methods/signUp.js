const signUp = async (credentials) => {
  const url = `${process.env.REACT_APP_API_HOST_URL}/api/auth/createuser`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: credentials.name
        .split(" ")
        .map((e) => e[0].toUpperCase() + e.slice(1).toLowerCase())
        .join(" "),
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const data = await response.json();
  return data;
};

export default signUp;
