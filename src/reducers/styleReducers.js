const styleInitial = JSON.parse(localStorage.getItem("style")) || {
  backgroundColor: "white",
  color: "black",
};

let changeStyle = (state = styleInitial, action) => {
  switch (action.type) {
    case "DARKTHEME":
      localStorage.setItem(
        "style",
        JSON.stringify({
          backgroundColor: "#313438",
          color: "white",
        })
      );
      return {
        backgroundColor: "#313438",
        color: "white",
      };
    case "LIGHTTHEME":
      localStorage.setItem(
        "style",
        JSON.stringify({
          backgroundColor: "white",
          color: "black",
        })
      );
      return {
        backgroundColor: "white",
        color: "black",
      };
    default:
      return state;
  }
};
export default changeStyle;
