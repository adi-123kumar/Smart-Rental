import useAuth from "../hooks/useAuth";
import PropertyCard from "../components/PropertyCard";

function Favorites() {
  const { favorites } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">❤️ My Favorite Properties</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">
          No favorite properties yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {favorites.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;