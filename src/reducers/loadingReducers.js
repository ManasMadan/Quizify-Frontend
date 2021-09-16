const loadingInitial = false;

let changeLoadingState = (state = loadingInitial, action) => {
  switch (action.type) {
    case "LOADING":
      return true;
    case "NOTLOADING":
      return false;
    default:
      return state;
  }
};
export default changeLoadingState;
