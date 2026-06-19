function PropertyLocation({
  location,
}) {
  return (
    <div className="mt-12">

      <h2
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Property Location
      </h2>

      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-lg
          border
        "
      >

        <iframe
          title="Property Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            location
          )}&output=embed`}
          width="100%"
          height="450"
          style={{
            border: 0,
          }}
          loading="lazy"
          allowFullScreen
        />

      </div>

    </div>
  );
}

export default PropertyLocation;