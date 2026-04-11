import { useState } from "react";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex gap-4 items-center">
      <input
        type="text"
        placeholder="Search by location..."
        className="flex-1 border p-2 rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;