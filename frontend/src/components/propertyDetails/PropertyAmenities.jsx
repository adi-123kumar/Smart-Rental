import { motion } from "framer-motion";

import {
  FaWifi,
  FaParking,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

import {
  MdBalcony,
  MdChair,
} from "react-icons/md";

function PropertyAmenities({
  amenities,
}) {
  return (
    <div className="mt-10">

      <h2
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Premium Amenities
      </h2>

      <div
        className="
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >

        {amenities?.wifi && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <FaWifi
              size={28}
              className="text-blue-600"
            />

            <div>
              <h3 className="font-bold">
                High Speed WiFi
              </h3>

              <p className="text-gray-500 text-sm">
                Unlimited internet
              </p>
            </div>
          </motion.div>
        )}

        {amenities?.parking && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <FaParking
              size={28}
              className="text-green-600"
            />

            <div>
              <h3 className="font-bold">
                Parking
              </h3>

              <p className="text-gray-500 text-sm">
                Secure vehicle parking
              </p>
            </div>
          </motion.div>
        )}

        {amenities?.ac && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <FaSnowflake
              size={28}
              className="text-cyan-500"
            />

            <div>
              <h3 className="font-bold">
                Air Conditioning
              </h3>

              <p className="text-gray-500 text-sm">
                Fully air conditioned
              </p>
            </div>
          </motion.div>
        )}

        {amenities?.furnished && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <MdChair
              size={28}
              className="text-orange-500"
            />

            <div>
              <h3 className="font-bold">
                Furnished
              </h3>

              <p className="text-gray-500 text-sm">
                Ready to move
              </p>
            </div>
          </motion.div>
        )}

        {amenities?.balcony && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <MdBalcony
              size={28}
              className="text-purple-500"
            />

            <div>
              <h3 className="font-bold">
                Balcony
              </h3>

              <p className="text-gray-500 text-sm">
                Scenic outdoor space
              </p>
            </div>
          </motion.div>
        )}

        {amenities?.powerBackup && (
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              flex
              items-center
              gap-4
              border
            "
          >
            <FaBolt
              size={28}
              className="text-yellow-500"
            />

            <div>
              <h3 className="font-bold">
                Power Backup
              </h3>

              <p className="text-gray-500 text-sm">
                24x7 electricity
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default PropertyAmenities;