import { useState } from "react";

function FilterSidebar({ onFilter }) {
  const [price, setPrice] = useState("");

  const handleFilter = () => {
    onFilter({ price });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-semibold mb-4">Filters</h2>

      <select
        className="w-full border p-2 rounded mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="">Price Range</option>
        <option value="low">Below ₹10,000</option>
        <option value="mid">₹10,000 - ₹20,000</option>
        <option value="high">Above ₹20,000</option>
      </select>

      <button
        onClick={handleFilter}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterSidebar;