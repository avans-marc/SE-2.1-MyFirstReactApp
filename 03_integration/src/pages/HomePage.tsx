import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="page page-home">
      <h1>Homepage</h1>
      <p className="subtitle">A small playground for fetching data with TanStack Query</p>
      <Link className="btn" to="/cars">Cars</Link>
    </div>
  );
}
