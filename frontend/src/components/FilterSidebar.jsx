import { useState } from "react";

import {
  FaFilter,
  FaHome,
  FaBed,
  FaRupeeSign,
  FaSortAmountDown,
  FaRedo,
} from "react-icons/fa";

function FilterSidebar({ onFilter }) {
  const initialFilters = {
    type: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    status: "",
    sort: "",
  };

  const [filters, setFilters] =
    useState(initialFilters);

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

  const handleReset = () => {
    setFilters(initialFilters);
    onFilter({});
  };

  return (
    <div
  className="
  sticky
  top-24

  max-h-[calc(100vh-120px)]
  overflow-y-auto

  bg-white/80
  backdrop-blur-lg
  border
  border-gray-200
  rounded-3xl
  shadow-xl
  p-6
  transition-all
  duration-300
  hover:shadow-2xl
"
>
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div
          className="
          w-10
          h-10
          rounded-xl

          bg-gradient-to-r
          from-blue-500
          to-purple-500

          flex
          items-center
          justify-center

          text-white
        "
        >
          <FaFilter />
        </div>

        <div>
          <h2 className="font-bold text-xl">
            Smart Filters
          </h2>

          <p className="text-xs text-gray-500">
            Find your perfect home
          </p>
        </div>

      </div>

      {/* Property Type */}

      <div className="mb-4">

        <label className="flex items-center gap-2 font-medium mb-2">
          <FaHome className="text-blue-500" />
          Property Type
        </label>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3

            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
        >
          <option value="">
            All Types
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

      </div>

      {/* Bedrooms */}

      <div className="mb-4">

        <label className="flex items-center gap-2 font-medium mb-2">
          <FaBed className="text-purple-500" />
          Bedrooms
        </label>

        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3

            focus:ring-2
            focus:ring-purple-500
            outline-none
          "
        >
          <option value="">
            Any
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

      </div>

      {/* Price */}

      <div className="mb-4">

        <label className="flex items-center gap-2 font-medium mb-2">
          <FaRupeeSign className="text-green-500" />
          Budget
        </label>

        <div className="space-y-3">

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            placeholder="Min Price"
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-3

              focus:ring-2
              focus:ring-green-500
              outline-none
            "
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            placeholder="Max Price"
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-3

              focus:ring-2
              focus:ring-green-500
              outline-none
            "
          />

        </div>

      </div>

      {/* Status */}

      <div className="mb-4">

        <label className="font-medium block mb-2">
          Availability
        </label>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        >
          <option value="">
            Any Status
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

      </div>

      {/* Sort */}

      <div className="mb-6">

        <label className="flex items-center gap-2 font-medium mb-2">
          <FaSortAmountDown className="text-orange-500" />
          Sort
        </label>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        >
          <option value="">
            Default
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

      </div>

      {/* Buttons */}

      <div className="space-y-3">

        <button
          onClick={handleFilter}
          className="
            w-full

            bg-gradient-to-r
            from-blue-600
            to-purple-600

            text-white
            font-semibold

            py-3
            rounded-xl

            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >
          Apply Filters
        </button>

        <button
          onClick={handleReset}
          className="
            w-full

            border
            border-gray-300

            py-3
            rounded-xl

            flex
            items-center
            justify-center
            gap-2

            hover:bg-gray-100
            transition-all
          "
        >
          <FaRedo />
          Reset Filters
        </button>

      </div>

    </div>
  );
}

export default FilterSidebar;