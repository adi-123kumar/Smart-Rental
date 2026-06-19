import { motion } from "framer-motion";

function PropertyStats({
  property,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
        mt-8
      "
    >

      <motion.div
        whileHover={{
          y: -5,
        }}
        className="
          bg-white
          p-5
          rounded-2xl
          shadow
        "
      >
        <p className="text-gray-500">
          Bedrooms
        </p>

        <h3 className="text-2xl font-bold">
          🛏 {property.bedrooms}
        </h3>
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
        }}
        className="
          bg-white
          p-5
          rounded-2xl
          shadow
        "
      >
        <p className="text-gray-500">
          Bathrooms
        </p>

        <h3 className="text-2xl font-bold">
          🚿 {property.bathrooms}
        </h3>
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
        }}
        className="
          bg-white
          p-5
          rounded-2xl
          shadow
        "
      >
        <p className="text-gray-500">
          Area
        </p>

        <h3 className="text-2xl font-bold">
          📐 {property.area}
        </h3>
      </motion.div>

      <motion.div
        whileHover={{
          y: -5,
        }}
        className="
          bg-white
          p-5
          rounded-2xl
          shadow
        "
      >
        <p className="text-gray-500">
          Property Type
        </p>

        <h3 className="text-xl font-bold">
          {property.type}
        </h3>
      </motion.div>

    </div>
  );
}

export default PropertyStats;