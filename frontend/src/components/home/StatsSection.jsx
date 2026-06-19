
import { motion } from "framer-motion";

function StatsSection() {
  const stats = [
    {
      title: "Properties",
      value: 500,
    },
    {
      title: "Bookings",
      value: 1200,
    },
    {
      title: "Users",
      value: 3500,
    },
    {
      title: "Ratings",
      value: 5,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 my-12">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            y: -10,
          }}
          className="
            bg-white
            p-6
            rounded-xl
            shadow-lg
            text-center
          "
        >
          <h2 className="text-4xl font-bold text-blue-600">
  {item.value}+
</h2>

          <p className="text-gray-500 mt-2">
            {item.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsSection;