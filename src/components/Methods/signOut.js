const signOut = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  sessionStorage.removeItem("mySubmissions");
  sessionStorage.removeItem("myQuizcodes");
  localStorage.removeItem("auth-token");
};

export default signOut;
