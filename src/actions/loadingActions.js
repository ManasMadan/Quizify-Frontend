const setLoading = (loading) => {
  return {
    type: loading ? "LOADING" : "NOLOADING",
  };
};

export default setLoading;
