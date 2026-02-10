import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props{
  loadingMessage:string
}
export default function LoadingContainer({loadingMessage}:Props) {
  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa" // light gray background
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="info" />
      </div>
      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "1.2rem",
          color: "#6c757d",
          fontWeight: 500,
          animation: "fadeIn 1.5s ease-in-out infinite alternate"
        }}
      >
        {loadingMessage}
      </p>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0.4; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
