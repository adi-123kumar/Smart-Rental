import { useState } from "react";

function FilterSidebar({
  onFilter,
}) {
  const [filters, setFilters] =
    useState({
      type: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      status: "",
      sort: "",
    });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">

      <h2 className="font-semibold text-lg mb-4">
        Filters
      </h2>

      <select
        name="type"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      >
        <option value="">
          Property Type
        </option>

        <option value="Apartment">
          Apartment
        </option>

        <option value="House">
          House
        </option>

        <option value="Room">
          Room
        </option>
      </select>

      <select
        name="bedrooms"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      >
        <option value="">
          Bedrooms
        </option>

        <option value="1">
          1 BHK
        </option>

        <option value="2">
          2 BHK
        </option>

        <option value="3">
          3 BHK
        </option>

        <option value="4">
          4+ BHK
        </option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      />

      <select
        name="status"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      >
        <option value="">
          Status
        </option>

        <option value="Available">
          Available
        </option>

        <option value="Booked">
          Booked
        </option>

        <option value="Rented">
          Rented
        </option>
      </select>

      <select
        name="sort"
        className="w-full border p-2 rounded mb-3"
        onChange={handleChange}
      >
        <option value="">
          Sort By
        </option>

        <option value="priceAsc">
          Price Low → High
        </option>

        <option value="priceDesc">
          Price High → Low
        </option>

        <option value="oldest">
          Oldest First
        </option>
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