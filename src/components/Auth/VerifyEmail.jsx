import { verifyEmail, useParams, useEffect } from "../../base";

export default function VerifyEmail() {
  const { userId } = useParams();

  useEffect(() => {
    const myFunction = async () => {
      const res = await verifyEmail(userId);
      if (res.success) {
        document.getElementById("verifying").innerText = "Verified";
      } else if (res.error === "Token Expired") {
        document.getElementById("verifying").innerText = "Link Expired";
      } else {
        document.getElementById("verifying").innerText = "Some Error Occured";
      }
    };

    myFunction();
  }, []);

  return (
    <div className="container">
      <h2 id="verifying">Verifying...</h2>
    </div>
  );
}
