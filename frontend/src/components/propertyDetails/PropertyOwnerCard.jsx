import { motion } from "framer-motion";

function PropertyOwnerCard({
  owner,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        bg-gradient-to-br
        from-blue-50
        to-indigo-100
        p-6
        rounded-3xl
        shadow-lg
        border
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            h-20
            w-20
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            text-3xl
            font-bold
          "
        >
          {owner?.name
            ?.charAt(0)
            ?.toUpperCase()}
        </div>

        <div>

          <h3 className="text-2xl font-bold">
            {owner?.name}
          </h3>

          <p className="text-green-600 font-medium">
            ✔ Verified Property Owner
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-2">

        <p>
          📧 {owner?.email}
        </p>

        <p>
          🏠 Trusted Property Lister
        </p>

        <p>
          ⭐ Quick Response Owner
        </p>

      </div>

      <div className="mt-6">

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Contact Owner
        </button>

      </div>

    </motion.div>
  );
}

export default PropertyOwnerCard;