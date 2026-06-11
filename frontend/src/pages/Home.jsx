import { useState } from "react";
import { propertiesData } from "../utils/dummyData.js";
import PropertyCard from "../components/PropertyCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import { getRecommendations } from "../utils/recommend.js";
function Home() {
  const [properties, setProperties] = useState(propertiesData);
  const recommended = getRecommendations(propertiesData);
  // 🔍 Search
  const handleSearch = (location) => {
    const filtered = propertiesData.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    );
    setProperties(filtered);
  };

  // 🎯 Filter
  const handleFilter = ({ price }) => {
    let filtered = [...propertiesData];

    if (price === "low") {
      filtered = filtered.filter((p) => p.price < 10000);
    } else if (price === "mid") {
      filtered = filtered.filter((p) => p.price >= 10000 && p.price <= 20000);
    } else if (price === "high") {
      filtered = filtered.filter((p) => p.price > 20000);
    }

    setProperties(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
        {recommended.length > 0 && (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">
      ⭐ Recommended for You
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recommended.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  </div>
)}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 hidden md:block">
          <FilterSidebar onFilter={handleFilter} />
        </div>

        {/* Properties */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">
            Explore Properties
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <p>No properties found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;