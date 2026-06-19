import { useEffect, useState } from "react";

import API from "../services/api.js";

import PropertyCard from "../components/PropertyCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";

import HeroSection from "../components/home/HeroSection.jsx";
import StatsSection from "../components/home/StatsSection.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import PopularCategories from "../components/home/PopularCategories.jsx";

import Footer from "../components/Footer.jsx";

function Home() {
  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (
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

  const handleSearch = (
    keyword
  ) => {
    fetchProperties({
      keyword,
    });
  };

  const handleFilter = (
    filters
  ) => {
    fetchProperties(filters);
  };

const handleCategoryClick =
  (category) => {

    fetchProperties({
      type: category,
    });

    document
      .getElementById(
        "properties"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };
  const handleExploreClick = () => {
    const section =
      document.getElementById(
        "properties"
      );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">

        {/* Hero Section */}
        <HeroSection
          onExplore={
            handleExploreClick
          }
        />

        {/* Stats */}
        <StatsSection />

        {/* Popular Categories */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <PopularCategories
            onCategoryClick={
              handleCategoryClick
            }
          />
        </div>

        {/* Search */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <SearchBar
            onSearch={
              handleSearch
            }
          />
        </div>

        {/* Property Listing */}
        <div id="properties" className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex gap-6">

            {/* Sidebar */}
            <div className="w-1/4 hidden lg:block">
              <FilterSidebar
                onFilter={
                  handleFilter
                }
              />
            </div>

            {/* Properties */}
            <div className="flex-1">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-4xl font-bold">
                  Explore Properties
                </h2>

                <span className="text-gray-500">
                  {properties.length}
                  {" "}
                  Properties Found
                </span>

              </div>

              {loading ? (
                <h1 className="text-center text-xl py-20">
                  Loading Properties...
                </h1>
              ) : properties.length >
                0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                  "
                >
                  {properties.map(
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
                  )}
                </div>
              ) : (
                <div className="text-center py-20">

                  <h2 className="text-2xl font-bold">
                    No Properties Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Try changing filters
                    or search terms.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Why Choose Us */}
        <div className="max-w-7xl mx-auto px-6">
          <WhyChooseUs />
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-6">
          <Testimonials />
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;