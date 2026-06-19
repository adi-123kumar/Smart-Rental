import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      title: "Verified Properties",
      icon: "🏠",
    },
    {
      title: "Secure Booking",
      icon: "🔒",
    },
    {
      title: "Trusted Reviews",
      icon: "⭐",
    },
    {
      title: "24/7 Support",
      icon: "💬",
    },
  ];

  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold text-center mb-10">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
            }}
            className="
              bg-white
              rounded-xl
              shadow-lg
              p-8
              text-center
            "
          >
            <div className="text-5xl">
              {item.icon}
            </div>

            <h3 className="font-semibold mt-4">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;