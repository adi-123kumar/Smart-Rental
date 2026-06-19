import { motion } from "framer-motion";

function Testimonials() {
  const reviews = [
    {
      name: "Aditya Kumar",
      review:
        "Amazing platform and very easy booking process.",
    },
    {
      name: "Rahul Sharma",
      review:
        "Found a rental house in just one day.",
    },
    {
      name: "Priya Singh",
      review:
        "Very clean UI and trusted listings.",
    },
  ];

  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold text-center mb-10">
        What Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
            }}
            className="
              bg-white
              rounded-xl
              shadow-lg
              p-6
            "
          >
            <div className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-4 italic">
              "{item.review}"
            </p>

            <h4 className="font-bold mt-4">
              {item.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;