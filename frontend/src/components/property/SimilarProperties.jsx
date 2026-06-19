import { useEffect, useState } from "react";
import API from "../../services/api";
import PropertyCard from "../PropertyCard";

function SimilarProperties({
  currentPropertyId,
  propertyType,
}) {
  const [properties, setProperties] =
    useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties =
    async () => {
      try {
        const { data } =
          await API.get(
            `/properties`
          );

        const filtered =
          data
            .filter(
              (property) =>
                property._id !==
                  currentPropertyId &&
                property.type ===
                  propertyType
            )
            .slice(0, 3);

        setProperties(filtered);

      } catch (error) {
        console.log(error);
      }
    };

  if (
    properties.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-16">

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Similar Properties
      </h2>

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
        "
      >
        {properties.map(
          (property) => (
            <PropertyCard
              key={
                property._id
              }
              property={
                property
              }
            />
          )
        )}
      </div>

    </div>
  );
}

export default SimilarProperties;