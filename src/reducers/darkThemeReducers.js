const darkThemeInitial = localStorage.getItem("dark-mode") || false;

let changeTheme = (state = darkThemeInitial, action) => {
  switch (action.type) {
    case "DARKTHEME":
      localStorage.setItem("dark-mode", true);
      return true;
    case "LIGHTTHEME":
      localStorage.setItem("dark-mode", false);
      return false;
    default:
      return state;
  }
};
export default changeTheme;
