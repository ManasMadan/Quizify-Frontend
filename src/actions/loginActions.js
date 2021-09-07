export const toggleLogin = (login) => {
  return {
    type: login ? "LOGGEDIN" : "LOGGEDOUT",
  };
};
