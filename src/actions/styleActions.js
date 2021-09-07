const toggleStyle = (darkTheme) => {
  return {
    type: darkTheme ? "LIGHTTHEME" : "DARKTHEME",
  };
};

export default toggleStyle;
