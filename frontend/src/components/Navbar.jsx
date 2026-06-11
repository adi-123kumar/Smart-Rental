import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold"
      >
        Smart Rental
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">

        <Link to="/">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/my-properties">
              My Properties
            </Link>

            <Link
              to="/add-property"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
            >
              Add Property
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;