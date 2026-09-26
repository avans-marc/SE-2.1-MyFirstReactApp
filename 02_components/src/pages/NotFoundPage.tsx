import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page page-home">
      <h1>404</h1>
      <p className="subtitle">This page does not exist.</p>
      <Link className="btn" to="/">Back home</Link>
    </div>
  );
}
