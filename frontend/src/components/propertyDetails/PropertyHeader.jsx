import PropertyOverview from "./PropertyOverview";
import PropertyStats from "./PropertyStats";

function PropertyHeader({
  property,
}) {
  return (
    <>
      <PropertyOverview
        property={property}
      />

      <PropertyStats
        property={property}
      />
    </>
  );
}

export default PropertyHeader;