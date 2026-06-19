import { motion } from "framer-motion";

function PropertyInfoCard({
  property,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        p-6
        shadow-lg
        border
      "
    >
      <h3 className="text-xl font-bold mb-4">
        Property Information
      </h3>

      <div className="space-y-3">

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

    </motion.div>
  );
}

export default PropertyInfoCard;