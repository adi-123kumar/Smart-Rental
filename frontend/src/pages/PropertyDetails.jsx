import { useParams } from "react-router-dom";
import { propertiesData } from "../utils/dummyData";
import { useEffect, useRef } from "react";
import { trackEvent } from "../utils/track";

function PropertyDetails() {
  const { id } = useParams();

  const property = propertiesData.find((p) => p._id === id);

  const hasTracked = useRef(false); // 🔥 important

  useEffect(() => {
    if (!property || hasTracked.current) return;

    trackEvent({
      type: "view",
      propertyId: property._id,
    });

    hasTracked.current = true; // prevent duplicate
  }, [property]);

  if (!property) {
    return <h1 className="p-6">Property not found</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={property.image || "https://via.placeholder.com/400x200"}
          alt="property"
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            {property.title}
          </h1>

          <p className="text-gray-600 mb-2">
            📍 {property.location}
          </p>

          <p className="text-blue-600 text-xl font-semibold mb-4">
            ₹ {property.price}
          </p>

          <p className="text-gray-700 mb-6">
            This is a beautiful property located in {property.location}.
            It offers great amenities and a comfortable living experience.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-200 p-3 rounded">
              🏠 Type: {property.type}
            </div>
            <div className="bg-gray-200 p-3 rounded">💰 Affordable</div>
            <div className="bg-gray-200 p-3 rounded">📶 WiFi Available</div>
            <div className="bg-gray-200 p-3 rounded">🚗 Parking</div>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Contact Owner
            </button>

            <button className="bg-green-600 text-white px-6 py-2 rounded">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;