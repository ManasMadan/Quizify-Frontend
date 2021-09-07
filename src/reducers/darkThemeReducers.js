const darkThemeInitial = false;

let changeTheme = (state = darkThemeInitial, action) => {
  switch (action.type) {
    case "DARKTHEME":
      return true;
    case "LIGHTTHEME":
      return false;
    default:
      return state;
  }
};
export default changeTheme;
