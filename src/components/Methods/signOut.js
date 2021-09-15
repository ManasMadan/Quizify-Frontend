import { cookies } from "../../base";
const signOut = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  sessionStorage.removeItem("mySubmissions");
  sessionStorage.removeItem("myQuizcodes");
  cookies.remove("auth-token");
};

export default signOut;
