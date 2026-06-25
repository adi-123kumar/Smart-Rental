import {
  motion,
  AnimatePresence,
} from "framer-motion";

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
          h-[520px]
          lg:h-[550px]
          bg-gradient-to-r
          from-slate-900
          via-gray-900
          to-black
          rounded-3xl
          overflow-hidden
        "
      >
        {/* Status Badge */}

        <div
          className="
            absolute
            top-5
            left-5
            z-30
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
                property.status === "Available"
                  ? "bg-green-600"
                  : property.status === "Booked"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }
            `}
          >
            {property.status}
          </span>
        </div>

        {/* Image Counter */}

        <div
          className="
            absolute
            top-5
            right-5
            z-30
            bg-black/50
            backdrop-blur-md
            text-white
            px-4
            py-2
            rounded-full
          "
        >
          {selectedImage + 1} /{" "}
          {property.images.length}
        </div>

        {/* Previous Button */}

        <button
          onClick={prevImage}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            z-30
            bg-white/20
            backdrop-blur-lg
            text-white
            p-4
            rounded-full
            hover:bg-white/40
            transition
          "
        >
          <FaChevronLeft />
        </button>

        {/* Next Button */}

        <button
          onClick={nextImage}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            z-30
            bg-white/20
            backdrop-blur-lg
            text-white
            p-4
            rounded-full
            hover:bg-white/40
            transition
          "
        >
          <FaChevronRight />
        </button>

        {/* Animated Image Slider */}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            onClick={() =>
              setShowGallery(true)
            }
            className="
              absolute
              inset-0
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
                w-full
                h-full
                object-cover
              "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Gallery */}

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          p-4
          scrollbar-hide
        "
      >
        {property.images?.map(
          (image, index) => (
            <motion.img
              key={index}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              src={image}
              alt=""
              onClick={() =>
                setSelectedImage(index)
              }
              className={`
                h-28
                w-44
                object-cover
                rounded-2xl
                cursor-pointer
                border-4
                transition-all
                duration-300

                ${
                  selectedImage === index
                    ? `
                      border-blue-500
                      shadow-lg
                      shadow-blue-500/30
                      scale-105
                    `
                    : `
                      border-transparent
                      hover:border-gray-300
                    `
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