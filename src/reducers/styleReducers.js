const styleInitial = {
  backgroundColor: "white",
  color: "black",
};

let changeStyle = (state = styleInitial, action) => {
  switch (action.type) {
    case "DARKTHEME":
      return {
        backgroundColor: "#313438",
        color: "white",
      };
    case "LIGHTTHEME":
      return {
        backgroundColor: "white",
        color: "black",
      };
    default:
      return state;
  }
};
export default changeStyle;
