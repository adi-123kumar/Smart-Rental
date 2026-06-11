import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function MyProperties() {
  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const { data } =
        await API.get(
          "/properties/my-properties"
        );

      setProperties(data);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load properties"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this property?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/properties/${id}`
      );

      setProperties(
        properties.filter(
          (property) =>
            property._id !== id
        )
      );

      alert(
        "✅ Property Deleted"
      );

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>

      {properties.length === 0 ? (
        <div className="bg-white p-6 rounded-xl">
          No properties added yet
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={
                  property.image ||
                  "https://via.placeholder.com/400x200"
                }
                alt={property.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">
                  {property.title}
                </h2>

                <p>
                  📍 {property.location}
                </p>

                <p className="text-green-600 font-bold">
                  ₹ {property.price}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {property.type}
                </p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/edit-property/${property._id}`}
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        property._id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProperties;