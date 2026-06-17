import {
  useState,
} from "react";

import API from "../../services/api";

import StarRating from "../StarRating";

import { motion } from "framer-motion";

function ReviewForm({
  propertyId,
  refreshReviews,
}) {
  const [rating,
    setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await API.post(
          `/reviews/${propertyId}`,
          {
            rating,
            comment,
          }
        );

        setComment("");
        setRating(5);

        refreshReviews();

        alert(
          "Review Added Successfully"
        );

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Error"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        bg-white
        shadow-lg
        rounded-xl
        p-6
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        Write Review
      </h2>

      <form
        onSubmit={
          submitHandler
        }
      >
        <StarRating
          rating={rating}
          setRating={
            setRating
          }
          editable
        />

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          rows="4"
          required
          placeholder="Share your experience..."
          className="
            border
            w-full
            mt-4
            p-3
            rounded-lg
          "
        />

        <button
          disabled={loading}
          className="
            mt-4
            bg-blue-600
            text-white
            px-6
            py-2
            rounded-lg
          "
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </form>
    </motion.div>
  );
}

export default ReviewForm;