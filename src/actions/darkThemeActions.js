const toggleTheme = (darkTheme) => {
  return {
    type: darkTheme ? "LIGHTTHEME" : "DARKTHEME",
  };
};

export default toggleTheme;
