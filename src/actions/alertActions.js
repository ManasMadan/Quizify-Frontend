const setAlert = (alert) => {
  return {
    type: alert === null ? "HIDE" : "SHOW",
    alert,
  };
};

export default setAlert;
