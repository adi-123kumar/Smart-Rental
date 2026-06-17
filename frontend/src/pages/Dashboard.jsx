import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user, favorites, logout } = useAuth();

  const interactions =
    JSON.parse(localStorage.getItem("interactions")) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            user?.profileImage ||
            "https://ui-avatars.com/api/?name=" +
            user?.name
          }
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>

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
        <Link
          to="/profile"
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          My Profile
        </Link>

        <Link
          to="/edit-profile"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Edit Profile
        </Link>

        <Link
          to="/change-password"
          className="bg-orange-600 text-white px-6 py-2 rounded"
        >
          Change Password
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