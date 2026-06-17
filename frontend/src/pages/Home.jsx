import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";

import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

function Home() {
  const [properties,
    setProperties] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties =
    async (
      filters = {}
    ) => {
      try {
        setLoading(true);

        
        const query =
          new URLSearchParams(
            filters
          ).toString();

        const { data } =
          await API.get(
            `/properties?${query}`
          );

        setProperties(data);

      } catch (error) {
        console.log(error);

        alert(
          "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleSearch =
    (keyword) => {
      fetchProperties({
        keyword,
      });
    };

  const handleFilter =
    (filters) => {
      fetchProperties(
        filters
      );
    };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading Properties...
      </h1>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="mb-6">
        <SearchBar
          onSearch={
            handleSearch
          }
        />
      </div>

      <div className="flex gap-6">

        <div className="w-1/4 hidden md:block">
          <FilterSidebar
            onFilter={
              handleFilter
            }
          />
        </div>

        <div className="flex-1">

          <h1 className="text-2xl font-bold mb-6">
            Explore Properties
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {properties.length >
            0 ? (
              properties.map(
                (
                  property
                ) => (
                  <PropertyCard
                    key={
                      property._id
                    }
                    property={
                      property
                    }
                  />
                )
              )
            ) : (
              <p>
                No Properties
                Found
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;