export const getRecommendations = (properties) => {
  const interactions =
    JSON.parse(localStorage.getItem("interactions")) || [];

  if (interactions.length === 0) return [];

  // Count interactions per property
  const counts = {};

  interactions.forEach((item) => {
    counts[item.propertyId] = (counts[item.propertyId] || 0) + 1;
  });

  // Sort by most interacted
  const sortedIds = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  );

  // Get top property
  const topProperty = properties.find(
    (p) => p._id === sortedIds[0]
  );

  if (!topProperty) return [];

  // Recommend similar (same type or location)
  const recommended = properties.filter(
    (p) =>
      p._id !== topProperty._id &&
      (p.type === topProperty.type ||
        p.location === topProperty.location)
  );

  return recommended;
};