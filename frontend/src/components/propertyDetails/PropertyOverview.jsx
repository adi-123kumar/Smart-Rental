import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function PropertyOverview({
  property,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        bg-gradient-to-r
        from-blue-50
        to-indigo-50
        rounded-3xl
        p-8
        shadow-md
        border
      "
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        <div>

          <div className="flex items-center gap-3 mb-3">

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                text-white

                ${
                  property.status ===
                  "Available"
                    ? "bg-green-500"
                    : property.status ===
                      "Booked"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              `}
            >
              {property.status}
            </span>

            <span
              className="
                bg-white
                px-3
                py-1
                rounded-full
                shadow
                text-sm
              "
            >
              {property.type}
            </span>

          </div>

          <h1 className="text-5xl font-bold text-gray-800">
            {property.title}
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            📍 {property.location}
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-500 mb-2">
            Monthly Rent
          </p>

          <h2 className="text-5xl font-bold text-blue-600">
            ₹ {property.price}
          </h2>

          <div className="flex items-center justify-end gap-2 mt-4">

            <FaStar
              className="
                text-yellow-400
                text-xl
              "
            />

            <span className="font-bold text-lg">
              {property.averageRating?.toFixed(
                1
              )}
            </span>

            <span className="text-gray-500">
              (
              {
                property.numReviews
              }{" "}
              reviews)
            </span>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default PropertyOverview;