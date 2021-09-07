const login = () => {
  return {
    type: "LOGGEDIN",
  };
};

const logout = () => {
  return {
    type: "LOGGEDOUT",
  };
};

export default { login, logout };
