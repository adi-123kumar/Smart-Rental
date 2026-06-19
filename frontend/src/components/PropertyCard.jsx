import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { trackEvent } from "../utils/track";

import { motion } from "framer-motion";

import {
  FaStar,
  FaBed,
  FaBath,
} from "react-icons/fa";

function PropertyCard({ property }) {
  const { favorites, toggleFavorite } =
    useAuth();

  const isFavorite =
    favorites.some(
      (item) =>
        item._id === property._id
    );

  return (
    <Link
      to={`/property/${property._id}`}
      onClick={() =>
        trackEvent({
          type: "click",
          propertyId: property._id,
        })
      }
    >
      <motion.div
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          relative
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
        "
      >
        {/* Favorite Button */}

        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={(e) => {
            e.preventDefault();

            toggleFavorite(
              property
            );
          }}
          className="
            absolute
            top-3
            right-3
            z-20
            text-2xl
          "
        >
          {isFavorite
            ? "❤️"
            : "🤍"}
        </motion.button>

        {/* Property Image */}

        <div className="overflow-hidden">
          <motion.img
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.4,
            }}
            src={
              property.images?.[0] ||
              "https://via.placeholder.com/400x250"
            }
            alt={property.title}
            className="
              w-full
              h-56
              object-cover
            "
          />
        </div>

        {/* Content */}

        <div className="p-5">

          <h3 className="text-xl font-bold line-clamp-1">
            {property.title}
          </h3>

          <p className="text-gray-500 mt-1">
            📍 {property.location}
          </p>

          {/* Type + Rating */}

          <div className="flex justify-between items-center mt-4">

            <span
              className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
              "
            >
              {property.type}
            </span>

            <div className="flex items-center gap-1">

              <FaStar className="text-yellow-400" />

              <span className="font-medium">
                {property.averageRating?.toFixed(
                  1
                ) || "0.0"}
              </span>

            </div>

          </div>

          {/* Features */}

          <div
            className="
              flex
              justify-between
              mt-5
              text-gray-600
            "
          >
            <div className="flex items-center gap-2">
              <FaBed />
              <span>
                {property.bedrooms || 0}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaBath />
              <span>
                {property.bathrooms || 0}
              </span>
            </div>
          </div>

          {/* Price */}

          <div className="mt-5">

            <p
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              ₹
              {property.price?.toLocaleString()}
            </p>

            <span className="text-gray-500 text-sm">
              per month
            </span>

          </div>

          {/* View Details */}

          <button
            className="
              mt-5
              w-full
              bg-blue-600
              text-white
              py-2
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            View Details
          </button>

        </div>

      </motion.div>
    </Link>
  );
}

export default PropertyCard;