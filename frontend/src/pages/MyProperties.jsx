import { useEffect, useState } from "react";
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProperties;