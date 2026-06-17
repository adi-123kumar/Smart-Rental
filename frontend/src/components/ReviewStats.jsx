function ReviewStats({
  property,
}) {
  return (
    <div
      className="
      bg-white
      p-6
      rounded-xl
      shadow
      mb-6
    "
    >
      <div className="flex items-center gap-4">

        <div className="text-5xl">
          ⭐
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            {
              property.averageRating
            }
          </h2>

          <p className="text-gray-500">
            {
              property.numReviews
            } Reviews
          </p>

        </div>

      </div>
    </div>
  );
}

export default ReviewStats;