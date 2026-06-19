import { motion } from "framer-motion";

function HeroSection({ onExplore }) {
  return (
    <div
      className="
        relative
        h-[500px]
        rounded-3xl
        overflow-hidden
        bg-cover
        bg-center
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-white
            text-5xl
            md:text-7xl
            font-bold
          "
        >
          Find Your Dream Home
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            text-white
            text-xl
            mt-4
            max-w-2xl
          "
        >
          Discover thousands of verified rental properties
          across India with trusted owners and
          transparent pricing.
        </motion.p>

        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
        >
          {/* Explore Button */}
          <motion.button
            onClick={onExplore}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              bg-blue-600
              text-white
              px-8
              py-3
              rounded-full
              font-semibold
              shadow-lg
            "
          >
            Explore Properties
          </motion.button>

          {/* Learn More */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              bg-white
              text-black
              px-8
              py-3
              rounded-full
              font-semibold
            "
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;