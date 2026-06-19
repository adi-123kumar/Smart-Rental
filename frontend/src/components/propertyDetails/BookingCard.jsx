import { Link } from "react-router-dom";
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
      <h2 className="text-4xl font-bold text-blue-600">
        ₹ {property.price}
      </h2>

      <p className="text-gray-500">
        Per Month
      </p>

      <div className="mt-4 flex items-center gap-2">
        <FaStar className="text-yellow-400" />

        <span className="font-semibold">
          {property.averageRating}
        </span>

        <span className="text-gray-500">
          ({property.numReviews} reviews)
        </span>
      </div>

      <div className="mt-6">
        <Link
          to={`/book/${property._id}`}
        >
          <button
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4
              rounded-xl
              font-bold
              transition
            "
          >
            Book Now
          </button>
        </Link>
      </div>

      <div className="mt-6 border-t pt-6">
        <h3 className="font-bold mb-3">
          Quick Details
        </h3>

        <p>
          🛏 {property.bedrooms} Bedrooms
        </p>

        <p>
          🚿 {property.bathrooms} Bathrooms
        </p>

        <p>
          📐 {property.area} Sq Ft
        </p>

        <p>
          🏠 {property.type}
        </p>
      </div>

      {/* Future Features */}

      <div className="mt-6 border-t pt-6">
        <button
          className="
            w-full
            border
            border-blue-600
            text-blue-600
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-50
          "
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export default BookingCard;