import useAuth from "../hooks/useAuth";
import PropertyCard from "../components/PropertyCard";

function Dashboard() {
  const { favorites } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p>No favorite properties yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;