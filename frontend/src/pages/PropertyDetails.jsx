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
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  if (!property) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Property Not Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Main Image */}
        <img
          src={
            property.images?.[0] ||
            "https://via.placeholder.com/1200x500"
          }
          alt={property.title}
          className="w-full h-[450px] object-cover"
        />

        {/* Additional Images */}
        {property.images?.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
            {property.images.map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="
                    w-full
                    h-32
                    object-cover
                    rounded-lg
                    border
                  "
                />
              )
            )}
          </div>
        )}

        <div className="p-8">

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">
            {property.title}
          </h1>

          {/* Location */}
          <p className="text-gray-500 text-lg">
            📍 {property.location}
          </p>

          {/* Price */}
          <p className="text-green-600 text-3xl font-bold mt-4">
            ₹ {property.price}
          </p>

          {/* Status */}
          <div className="mt-4">
            <span
              className={`
                px-4 py-2 rounded-full text-white
                ${
                  property.status ===
                  "Available"
                    ? "bg-green-600"
                    : property.status ===
                      "Booked"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }
              `}
            >
              {property.status}
            </span>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Property Features */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Property Features
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-gray-50 p-4 rounded-lg">
                🛏 Bedrooms:
                <strong>
                  {" "}
                  {property.bedrooms}
                </strong>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                🚿 Bathrooms:
                <strong>
                  {" "}
                  {property.bathrooms}
                </strong>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                📐 Area:
                <strong>
                  {" "}
                  {property.area} sq ft
                </strong>
              </div>

            </div>
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Amenities
            </h2>

            <div className="grid md:grid-cols-3 gap-3">

              {property.amenities?.wifi && (
                <div>📶 WiFi</div>
              )}

              {property.amenities?.parking && (
                <div>🚗 Parking</div>
              )}

              {property.amenities?.furnished && (
                <div>🛋 Furnished</div>
              )}

              {property.amenities?.ac && (
                <div>❄ AC</div>
              )}

              {property.amenities?.balcony && (
                <div>🌇 Balcony</div>
              )}

              {property.amenities?.powerBackup && (
                <div>⚡ Power Backup</div>
              )}

            </div>
          </div>

          {/* Property Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-5 rounded-lg">

              <h3 className="font-bold mb-3">
                Property Information
              </h3>

              <p>
                <strong>Type:</strong>{" "}
                {property.type}
              </p>

              <p>
                <strong>ID:</strong>{" "}
                {property._id}
              </p>

              <p>
                <strong>Listed On:</strong>{" "}
                {new Date(
                  property.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

            <div className="bg-gray-50 p-5 rounded-lg">

              <h3 className="font-bold mb-3">
                Owner Information
              </h3>

              <p>
                <strong>Name:</strong>{" "}
                {property.owner?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {property.owner?.email}
              </p>

            </div>

          </div>

          {/* Book Button */}
          <div className="mt-8 border-t pt-6">

            <button
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-8
                py-3
                rounded-lg
                text-lg
                font-semibold
              "
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PropertyDetails;