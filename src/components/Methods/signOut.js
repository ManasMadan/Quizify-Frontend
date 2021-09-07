import Cookies from "universal-cookie";
const cookies = new Cookies();

const signOut = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  cookies.remove("auth-token");
};

export default signOut;
