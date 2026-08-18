import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        SupportAI
      </div>

      <div className="nav-links">
        <Link to="/">Chat</Link>
        <Link to="/ticket">Create Ticket</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;