import { motion } from "framer-motion";

const categories = [
  "Apartment",
  "House",
  "Villa",
  "PG",
  "Studio",
  "Commercial",
];

function PopularCategories({
  onCategoryClick,
}) {
  return (
    <section className="my-16">

      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        {categories.map(
          (category) => (
            <motion.div
              key={category}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() =>
                onCategoryClick(
                  category
                )
              }
              className="
                bg-white
                rounded-xl
                shadow-md
                p-6
                text-center
                cursor-pointer
                hover:bg-blue-600
                hover:text-white
                transition-all
              "
            >
              {category}
            </motion.div>
          )
        )}

      </div>

    </section>
  );
}

export default PopularCategories;