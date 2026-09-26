import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar">
      {/* end: only "active" on exactly "/", not on every page that starts with "/" */}
      <NavLink className="nav-link" to="/" end>Home</NavLink>
      <NavLink className="nav-link" to="/cars">Cars</NavLink>
    </nav>
  );
}
