function PropertyDescription({
  property,
}) {
  return (
    <>
      {/* Description */}

      <div className="mt-8">

        <h2
          className="
            text-xl
            font-semibold
            mb-2
          "
        >
          Description
        </h2>

        <p
          className="
            text-gray-700
            leading-relaxed
          "
        >
          {property.description}
        </p>

      </div>

      {/* Features */}

      <div className="mt-8">

        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Property Features
        </h2>

        <div
          className="
            grid
            md:grid-cols-3
            gap-4
          "
        >

          <div
            className="
              bg-gray-50
              p-4
              rounded-lg
            "
          >
            🛏 Bedrooms:
            <strong>
              {" "}
              {property.bedrooms}
            </strong>
          </div>

          <div
            className="
              bg-gray-50
              p-4
              rounded-lg
            "
          >
            🚿 Bathrooms:
            <strong>
              {" "}
              {property.bathrooms}
            </strong>
          </div>

          <div
            className="
              bg-gray-50
              p-4
              rounded-lg
            "
          >
            📐 Area:
            <strong>
              {" "}
              {property.area} sq ft
            </strong>
          </div>

        </div>

      </div>
    </>
  );
}

export default PropertyDescription;