import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function BookingCard({ property }) {
  return (
    <div
      className="
        sticky
        top-24
        bg-white
        rounded-3xl
        shadow-xl
        border
        p-6
      "
    >
      <h2
        className="
          text-4xl
          font-bold
          text-blue-600
        "
      >
        ₹ {property.price}
      </h2>

      <p className="text-gray-500">
        per month
      </p>

      <div
        className="
          flex
          items-center
          gap-2
          mt-4
        "
      >
        <FaStar className="text-yellow-400" />

        <span className="font-semibold">
          {property.averageRating}
        </span>

        <span className="text-gray-500">
          ({property.numReviews} reviews)
        </span>
      </div>

      <div className="mt-6">
        <Link to={`/book/${property._id}`}>
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              w-full
              bg-blue-600
              text-white
              py-4
              rounded-xl
              font-semibold
            "
          >
            Book Now
          </motion.button>
        </Link>
      </div>

      <button
        className="
          w-full
          mt-3
          border
          py-4
          rounded-xl
          font-semibold
        "
      >
        Contact Owner
      </button>
    </div>
  );
}

export default BookingCard;