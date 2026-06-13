import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] =
    useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex gap-4 items-center">
      <input
        type="text"
        placeholder="Search properties..."
        className="flex-1 border p-3 rounded"
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;