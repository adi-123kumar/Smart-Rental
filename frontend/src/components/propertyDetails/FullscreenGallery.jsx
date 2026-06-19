import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function FullscreenGallery({
  showGallery,
  setShowGallery,
  property,
  selectedImage,
  nextImage,
  prevImage,
}) {
  if (
    !showGallery ||
    !property?.images?.length
  ) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/95
        z-50
        flex
        justify-center
        items-center
      "
    >
      {/* Close Button */}

      <button
        onClick={() =>
          setShowGallery(false)
        }
        className="
          absolute
          top-6
          right-6
          text-white
          text-5xl
          hover:text-red-400
          transition
        "
      >
        ×
      </button>

      {/* Previous */}

      <button
        onClick={prevImage}
        className="
          absolute
          left-6
          text-white
          text-4xl
          hover:scale-110
          transition
        "
      >
        <FaChevronLeft />
      </button>

      {/* Image */}

      <img
        src={
          property.images[
            selectedImage
          ]
        }
        alt=""
        className="
          max-h-[90vh]
          max-w-[90vw]
          object-contain
        "
      />

      {/* Next */}

      <button
        onClick={nextImage}
        className="
          absolute
          right-6
          text-white
          text-4xl
          hover:scale-110
          transition
        "
      >
        <FaChevronRight />
      </button>

      {/* Counter */}

      <div
        className="
          absolute
          bottom-8
          text-white
          text-lg
          bg-black/50
          px-4
          py-2
          rounded-full
        "
      >
        {selectedImage + 1} /
        {property.images.length}
      </div>
    </div>
  );
}

export default FullscreenGallery;