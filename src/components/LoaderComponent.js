import Loader from "react-loader-spinner";

export default function LoaderComponent() {
  return (
    <div
      style={{ height: "80vh", width: "100vw" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Loader type="Audio" />
    </div>
  );
}
