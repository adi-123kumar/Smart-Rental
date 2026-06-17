import StarRating from "../StarRating";

function ReviewList({
  reviews,
}) {
  if (!reviews.length) {
    return (
      <div className="bg-white shadow rounded-xl p-6 mt-8">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Reviews
      </h2>

      {reviews.map((review) => (
        <div
          key={review._id}
          className="border-b py-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                review.user
                  ?.profileImage ||
                "https://via.placeholder.com/50"
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h4 className="font-semibold">
                {
                  review.user
                    ?.name
                }
              </h4>

              <StarRating
                rating={
                  review.rating
                }
              />
            </div>
          </div>

          <p className="text-gray-700">
            {review.comment}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;