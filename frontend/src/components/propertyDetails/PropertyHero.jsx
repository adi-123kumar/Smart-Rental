import { motion } from "framer-motion";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function PropertyHero({
  property,
  selectedImage,
  setSelectedImage,
  nextImage,
  prevImage,
  setShowGallery,
}) {
  return (
    <>
      <div
        className="
          relative
          bg-gradient-to-r
          from-slate-900
          via-gray-900
          to-black
          rounded-3xl
          overflow-hidden
        "
      >

        {/* Status */}

        <div
          className="
            absolute
            top-5
            left-5
            z-20
          "
        >
          <span
            className={`
              px-5
              py-2
              rounded-full
              text-white
              font-semibold

              ${
                property.status ===
                "Available"
                  ? "bg-green-600"
                  : property.status ===
                    "Booked"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }
            `}
          >
            {property.status}
          </span>
        </div>

        {/* Counter */}

        <div
          className="
            absolute
            top-5
            right-5
            z-20
            bg-black/50
            text-white
            px-4
            py-2
            rounded-full
          "
        >
          {selectedImage + 1} /
          {property.images.length}
        </div>

        {/* Previous */}

        <button
          onClick={prevImage}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            z-20
            bg-white/20
            backdrop-blur-lg
            text-white
            p-4
            rounded-full
            hover:bg-white/40
          "
        >
          <FaChevronLeft />
        </button>

        {/* Next */}

        <button
          onClick={nextImage}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            z-20
            bg-white/20
            backdrop-blur-lg
            text-white
            p-4
            rounded-full
            hover:bg-white/40
          "
        >
          <FaChevronRight />
        </button>

        {/* Main Image */}

        <motion.div
          key={selectedImage}
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          onClick={() =>
            setShowGallery(true)
          }
          className="
            h-[650px]
            flex
            justify-center
            items-center
            p-5
            cursor-zoom-in
          "
        >
          <img
            src={
              property.images[
                selectedImage
              ]
            }
            alt=""
            className="
              max-h-full
              max-w-full
              object-contain
              rounded-2xl
            "
          />
        </motion.div>

      </div>

      {/* Thumbnails */}

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          p-4
        "
      >
        {property.images?.map(
          (image, index) => (
            <motion.img
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              src={image}
              alt=""
              onClick={() =>
                setSelectedImage(
                  index
                )
              }
              className={`
                h-28
                w-40
                object-cover
                rounded-xl
                cursor-pointer
                border-4
                transition-all

                ${
                  selectedImage ===
                  index
                    ? "border-blue-500 scale-105"
                    : "border-transparent"
                }
              `}
            />
          )
        )}
      </div>
    </>
  );
}

export default PropertyHero;