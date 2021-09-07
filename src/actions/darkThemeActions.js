export const toggleTheme = (darkTheme) => {
  return {
    type: darkTheme ? "LIGHTTHEME" : "DARKTHEME",
  };
};
