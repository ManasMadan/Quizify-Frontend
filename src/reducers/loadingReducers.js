const loadingInitial = false;

let changeLoading = (state = loadingInitial, action) => {
  switch (action.type) {
    case "LOADING":
      return true;
    case "NOLOADING":
      return false;
    default:
      return state;
  }
};
export default changeLoading;
