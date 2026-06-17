import { motion } from "framer-motion";

function StarRating({
  rating,
  setRating,
  editable = false,
}) {
  return (
    <div className="flex gap-1">

      {[1, 2, 3, 4, 5].map(
        (star) => (
          <motion.span
            key={star}
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() =>
              editable &&
              setRating(star)
            }
            className={`
              text-3xl
              cursor-pointer
              ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            `}
          >
            ★
          </motion.span>
        )
      )}

    </div>
  );
}

export default StarRating;