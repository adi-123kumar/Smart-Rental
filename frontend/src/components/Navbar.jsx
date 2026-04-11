import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>
        Home
      </Link>

      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
            Dashboard
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px", color: "#fff" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#fff" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;