export const toggleStyle = (darkTheme) => {
  return {
    type: darkTheme ? "LIGHTTHEME" : "DARKTHEME",
  };
};
