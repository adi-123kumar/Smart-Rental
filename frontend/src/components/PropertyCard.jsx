import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { trackEvent } from "../utils/track";
function PropertyCard({ property }) {
    const { favorites, toggleFavorite } = useAuth();

    const isFavorite = favorites.some((item) => item._id === property._id);

    return (
        <Link
            to={`/property/${property._id}`}
            onClick={() =>
                trackEvent({
                    type: "click",
                    propertyId: property._id,
                })
            }
        >
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">

                {/* ❤️ Favorite Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // stop navigation
                        toggleFavorite(property); // ❤️ actual logic
                    }}
                    className="absolute top-2 right-2 text-2xl z-10"
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

                {/* Image */}
                <img
                    src={
                        property.images?.[0] ||
                        "https://via.placeholder.com/400x200"
                    }
                    alt={property.title}
                    className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-gray-500">{property.location}</p>

                    <p className="text-blue-600 font-bold mt-2">
                        ₹ {property.price}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PropertyCard;