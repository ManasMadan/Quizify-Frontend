const setLoading = (loading) => {
  return {
    type: loading ? "LOADING" : "NOTLOADING",
  };
};

export default setLoading;
