import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user, favorites, logout } = useAuth();

  const interactions =
    JSON.parse(localStorage.getItem("interactions")) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name}
      </h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Profile Information
        </h2>

        <p className="mb-2">
          <span className="font-medium">Name:</span>{" "}
          {user?.name}
        </p>

        <p>
          <span className="font-medium">Email:</span>{" "}
          {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold">
            Favorite Properties
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {favorites.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold">
            Total Interactions
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {interactions.length}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/favorites"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          View Favorites
        </Link>

        <Link
          to="/"
          className="bg-gray-700 text-white px-6 py-2 rounded"
        >
          Browse Properties
        </Link>
        <Link
          to="/add-property"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add Property
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;