import { cookies } from "../../base";
const signOut = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  cookies.remove("auth-token");
};

export default signOut;
