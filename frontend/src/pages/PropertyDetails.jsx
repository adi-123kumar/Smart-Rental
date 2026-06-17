import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import { trackEvent } from "../utils/track";
import { motion } from "framer-motion";

import {
  FaStar,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

import {
  MdBalcony,
  MdChair,
} from "react-icons/md";

import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";
function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] =
    useState([]);

  const [selectedImage,
    setSelectedImage] =
    useState(0);

  useEffect(() => {
    fetchProperty();
    fetchReviews();
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

  const fetchReviews =
    async () => {
      try {
        const { data } =
          await API.get(
            `/reviews/${id}`
          );

        setReviews(data);

      } catch (error) {
        console.log(error);
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
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <img
            src={
              property.images?.[
              selectedImage
              ] ||
              "https://via.placeholder.com/1200x500"
            }
            alt=""
            className="
      w-full
      h-[500px]
      object-cover
    "
          />
        </motion.div>

        {/* Additional Images */}
        <div className="grid grid-cols-4 gap-3 p-4">

          {property.images?.map(
            (image, index) => (
              <motion.img
                whileHover={{
                  scale: 1.05,
                }}
                key={index}
                src={image}
                alt=""
                onClick={() =>
                  setSelectedImage(
                    index
                  )
                }
                className={`
          h-28
          w-full
          object-cover
          rounded-lg
          cursor-pointer
          border-4
          ${selectedImage ===
                    index
                    ? "border-blue-500"
                    : "border-transparent"
                  }
        `}
              />
            )
          )}

        </div>

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

          <div className="mt-4 flex items-center gap-3">

            <div className="flex items-center gap-1">

              <FaStar className="text-yellow-400" />

              <span className="font-bold">
                {
                  property.averageRating
                }
              </span>

            </div>

            <span className="text-gray-500">
              (
              {
                property.numReviews
              } reviews)
            </span>

          </div>

          {/* Status */}
          <div className="mt-4">
            <span
              className={`
                px-4 py-2 rounded-full text-white
                ${property.status ===
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
          <div className="grid md:grid-cols-3 gap-4">

            {property.amenities
              ?.wifi && (
                <div className="flex items-center gap-2">
                  <FaWifi />
                  WiFi
                </div>
              )}

            {property.amenities
              ?.parking && (
                <div className="flex items-center gap-2">
                  <FaParking />
                  Parking
                </div>
              )}

            {property.amenities
              ?.ac && (
                <div className="flex items-center gap-2">
                  <FaSnowflake />
                  AC
                </div>
              )}

            {property.amenities
              ?.furnished && (
                <div className="flex items-center gap-2">
                  <MdChair />
                  Furnished
                </div>
              )}

            {property.amenities
              ?.balcony && (
                <div className="flex items-center gap-2">
                  <MdBalcony />
                  Balcony
                </div>
              )}

            {property.amenities
              ?.powerBackup && (
                <div className="flex items-center gap-2">
                  <FaBolt />
                  Power Backup
                </div>
              )}

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

            <Link
              to={`/book/${property._id}`}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
      bg-blue-600
      text-white
      px-8
      py-3
      rounded-lg
      font-semibold
    "
              >
                Book Now
              </motion.button>
            </Link>
          </div>

        </div>

      </div>

      <ReviewForm
  propertyId={id}
  refreshReviews={
    fetchReviews
  }
/>

<ReviewList
  reviews={reviews}
/>

    </div>
  );
}

export default PropertyDetails;