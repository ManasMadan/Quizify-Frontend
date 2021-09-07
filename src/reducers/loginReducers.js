const loginInitial = false;

let changeLoginState = (state = loginInitial, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      return true;
    case "LOGGEDOUT":
      return false;
    default:
      return state;
  }
};
export default changeLoginState;
