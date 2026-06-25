import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { trackEvent } from "../utils/track";

import { motion } from "framer-motion";

import {
  FaStar,
  FaBed,
  FaBath,
  FaArrowRight,
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
          y: -10,
          scale: 1.02,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          border
          border-gray-100
        "
      >
        {/* Featured Ribbon */}

        <div
          className="
            absolute
            top-4
            left-4
            z-20
            bg-gradient-to-r
            from-orange-500
            to-red-500
            text-white
            px-3
            py-1
            text-xs
            rounded-full
            font-semibold
            shadow-md
          "
        >
          Featured
        </div>

        {/* Favorite */}

        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.2,
          }}
          onClick={(e) => {
            e.preventDefault();

            toggleFavorite(
              property
            );
          }}
          className="
            absolute
            top-4
            right-4
            z-20
            text-3xl
          "
        >
          {isFavorite
            ? "❤️"
            : "🤍"}
        </motion.button>

        {/* Image */}

        <div className="relative overflow-hidden">

          <motion.img
            whileHover={{
              scale: 1.12,
            }}
            transition={{
              duration: 0.5,
            }}
            src={
              property.images?.[0] ||
              "https://via.placeholder.com/400x250"
            }
            alt={property.title}
            className="
              w-full
              h-60
              object-cover
            "
          />

          {/* Dark Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent
            "
          />

          {/* Type Badge */}

          <div
            className="
              absolute
              bottom-4
              left-4
              bg-white/90
              backdrop-blur-md
              text-blue-700
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            "
          >
            {property.type}
          </div>

          {/* Rating */}

          <div
            className="
              absolute
              bottom-4
              right-4
              bg-yellow-400
              text-black
              px-3
              py-1
              rounded-full
              flex
              items-center
              gap-1
              font-semibold
            "
          >
            <FaStar />

            {property.averageRating?.toFixed(
              1
            ) || "0.0"}
          </div>

        </div>

        {/* Content */}

        <div className="p-5">

          <h3
            className="
              text-xl
              font-bold
              mb-1
              line-clamp-1
            "
          >
            {property.title}
          </h3>

          <p
            className="
              text-gray-500
              text-sm
              line-clamp-1
            "
          >
            📍 {property.location}
          </p>

          {/* Features */}

          <div
            className="
              flex
              justify-between
              mt-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                bg-gray-100
                px-4
                py-2
                rounded-xl
              "
            >
              <FaBed className="text-blue-600" />

              <span>
                {property.bedrooms || 0}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                bg-gray-100
                px-4
                py-2
                rounded-xl
              "
            >
              <FaBath className="text-blue-600" />

              <span>
                {property.bathrooms || 0}
              </span>
            </div>
          </div>

          {/* Price */}

          <div
            className="
              mt-5
              bg-gradient-to-r
              from-blue-50
              to-indigo-50
              p-4
              rounded-2xl
            "
          >
            <p
              className="
                text-3xl
                font-extrabold
                text-blue-700
              "
            >
              ₹
              {property.price?.toLocaleString()}
            </p>

            <span className="text-gray-500">
              per month
            </span>
          </div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              mt-5
              w-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              py-3
              rounded-2xl
              font-semibold
              flex
              justify-center
              items-center
              gap-2
              hover:from-blue-700
              hover:to-indigo-700
              transition
            "
          >
            View Details
            <FaArrowRight />
          </motion.button>

        </div>
      </motion.div>
    </Link>
  );
}

export default PropertyCard;