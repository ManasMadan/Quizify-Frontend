const alertInitial = null;

let changeAlert = (state = alertInitial, action) => {
  switch (action.type) {
    case "SHOW":
      return action.alert;
    case "HIDE":
      return null;
    default:
      return state;
  }
};
export default changeAlert;
