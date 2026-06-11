import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { trackEvent } from "../utils/track";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const { data } = await API.get(
        `/properties/${id}`
      );

      setProperty(data);

      trackEvent({
        type: "view",
        propertyId: data._id,
      });
    } catch (error) {
      console.log(error);
      alert("Property not found");
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

  if (!property) {
    return (
      <h1 className="text-center mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <img
          src={
            property.image ||
            "https://via.placeholder.com/600x300"
          }
          alt={property.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold">
            {property.title}
          </h1>

          <p className="text-gray-500 mt-2">
            📍 {property.location}
          </p>

          <p className="text-blue-600 text-2xl font-bold mt-3">
            ₹ {property.price}
          </p>

          <p className="mt-4">
            {property.description}
          </p>

          <div className="mt-6">
            <h2 className="font-bold">
              Property Type
            </h2>

            <p>{property.type}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-bold">
              Owner Information
            </h2>

            <p>
              {property.owner?.name}
            </p>

            <p>
              {property.owner?.email}
            </p>
          </div>

          <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;