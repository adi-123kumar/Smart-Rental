import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import { trackEvent } from "../utils/track";

import SimilarProperties from "../components/property/SimilarProperties";

import PropertyHero from "../components/propertyDetails/PropertyHero";
import FullscreenGallery from "../components/propertyDetails/FullscreenGallery";
import BookingCard from "../components/propertyDetails/BookingCard";
import PropertyOwnerCard from "../components/propertyDetails/PropertyOwnerCard";
import PropertyAmenities from "../components/propertyDetails/PropertyAmenities";
import PropertyLocation from "../components/propertyDetails/PropertyLocation";
import PropertyInfoCard from "../components/propertyDetails/PropertyInfoCard";
import PropertyDescription from "../components/propertyDetails/PropertyDescription";
import PropertyHeader from "../components/propertyDetails/PropertyHeader";

import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";
function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] =
    useState([]);
  const [selectedImage, setSelectedImage] =
    useState(0);

  const [showGallery, setShowGallery] =
    useState(false);

  useEffect(() => {
    fetchProperty();
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!property?.images?.length) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) =>
        prev === property.images.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [property]);

  const fetchProperty = async () => {
    try {
      const { data } = await API.get(
        `/properties/${id}`
      );

      setProperty(data);

      trackEvent({
        type: "view",
        propertyId: data._id,
      });

    } catch (error) {
      console.log(error);
      alert("Property not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews =
    async () => {
      try {
        const { data } =
          await API.get(
            `/reviews/${id}`
          );

        setReviews(data);

      } catch (error) {
        console.log(error);
      }
    };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === property.images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0
        ? property.images.length - 1
        : prev - 1
    );
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  if (!property) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Property Not Found
      </h1>
    );
  }

 return (
  <div
    className="
      min-h-screen
      p-6
      bg-gradient-to-br
      from-slate-50
      via-blue-50
      to-indigo-100
    "
  >
    <div className="max-w-7xl mx-auto">

      {/* HERO SECTION */}
      <PropertyHero
        property={property}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        nextImage={nextImage}
        prevImage={prevImage}
        setShowGallery={setShowGallery}
      />

      {/* FULLSCREEN GALLERY */}
      <FullscreenGallery
        showGallery={showGallery}
        setShowGallery={setShowGallery}
        property={property}
        selectedImage={selectedImage}
        nextImage={nextImage}
        prevImage={prevImage}
      />

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* PROPERTY HEADER */}
          <PropertyHeader property={property} />

          {/* DESCRIPTION */}
          <PropertyDescription property={property} />

          {/* AMENITIES */}
          <PropertyAmenities
            amenities={property.amenities}
          />

          {/* INFO + OWNER */}
          <div className="grid md:grid-cols-2 gap-6">

            <PropertyInfoCard
              property={property}
            />

            <PropertyOwnerCard
              owner={property.owner}
            />

          </div>

          {/* LOCATION */}
          <PropertyLocation
            location={property.location}
          />

        </div>

        {/* RIGHT SIDE */}
        <div>

          <BookingCard
            property={property}
          />

        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-12">

        <ReviewForm
          propertyId={id}
          refreshReviews={fetchReviews}
        />

        <ReviewList
          reviews={reviews}
        />

      </div>

      {/* SIMILAR PROPERTIES */}
      <div className="mt-12">

        <SimilarProperties
          currentPropertyId={
            property._id
          }
          propertyType={
            property.type
          }
        />

      </div>

    </div>
  </div>
);
}

export default PropertyDetails;