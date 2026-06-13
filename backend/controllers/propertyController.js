import Property from "../models/Property.js";

// =============================
// ADD PROPERTY
// =============================
export const addProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      type,
      description,
      bedrooms,
      bathrooms,
      area,
      status,

      wifi,
      parking,
      furnished,
      ac,
      balcony,
      powerBackup,
    } = req.body;

    const imageUrls =
      req.files?.map(
        (file) => file.path
      ) || [];

    const property =
      await Property.create({
        title,
        location,
        price,
        type,
        description,

        images: imageUrls,

        bedrooms,
        bathrooms,
        area,

        status,

        amenities: {
          wifi:
            wifi === "true",
          parking:
            parking === "true",
          furnished:
            furnished === "true",
          ac:
            ac === "true",
          balcony:
            balcony === "true",
          powerBackup:
            powerBackup === "true",
        },

        owner: req.user,
      });

    res.status(201).json(
      property
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// =============================
// GET ALL PROPERTIES
// =============================
export const getAllProperties =
  async (req, res) => {
    try {
      const {
        keyword,
        type,
        bedrooms,
        minPrice,
        maxPrice,
        status,
        sort,
      } = req.query;

      const query = {};

      // Search by location, title, description
      if (keyword) {
        query.$or = [
          {
            location: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            title: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: keyword,
              $options: "i",
            },
          },
        ];
      }

      // Property Type
      if (type) {
        query.type = type;
      }

      // Bedrooms
      if (bedrooms) {
        if (bedrooms === "4") {
          query.bedrooms = {
            $gte: 4,
          };
        } else {
          query.bedrooms =
            Number(bedrooms);
        }
      }

      // Status
      if (status) {
        query.status = status;
      }

      // Price Range
      if (
        minPrice ||
        maxPrice
      ) {
        query.price = {};

        if (minPrice) {
          query.price.$gte =
            Number(minPrice);
        }

        if (maxPrice) {
          query.price.$lte =
            Number(maxPrice);
        }
      }

      // Sorting
      let sortOption = {
        createdAt: -1,
      };

      if (
        sort === "priceAsc"
      ) {
        sortOption = {
          price: 1,
        };
      }

      if (
        sort === "priceDesc"
      ) {
        sortOption = {
          price: -1,
        };
      }

      if (
        sort === "oldest"
      ) {
        sortOption = {
          createdAt: 1,
        };
      }

      const properties =
        await Property.find(
          query
        )
          .populate(
            "owner",
            "name email"
          )
          .sort(
            sortOption
          );

      res.json(
        properties
      );

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =============================
// GET SINGLE PROPERTY
// =============================
export const getSingleProperty =
  async (req, res) => {
    try {
      const property =
        await Property.findById(
          req.params.id
        ).populate(
          "owner",
          "name email"
        );

      if (!property) {
        return res.status(404).json({
          message:
            "Property not found",
        });
      }

      res.json(property);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =============================
// GET MY PROPERTIES
// =============================
export const getMyProperties =
  async (req, res) => {
    try {
      const properties =
        await Property.find({
          owner: req.user,
        }).sort({
          createdAt: -1,
        });

      res.json(properties);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =============================
// UPDATE PROPERTY
// =============================
export const updateProperty =
  async (req, res) => {
    try {
      const property =
        await Property.findById(
          req.params.id
        );

      if (!property) {
        return res.status(404).json({
          message:
            "Property not found",
        });
      }

      if (
        property.owner.toString() !==
        req.user
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      const imageUrls =
        req.files?.length
          ? req.files.map(
              (file) =>
                file.path
            )
          : property.images;

      const updatedProperty =
        await Property.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            images:
              imageUrls,
          },
          {
            new: true,
          }
        );

      res.json(
        updatedProperty
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =============================
// DELETE PROPERTY
// =============================
export const deleteProperty =
  async (req, res) => {
    try {
      const property =
        await Property.findById(
          req.params.id
        );

      if (!property) {
        return res.status(404).json({
          message:
            "Property not found",
        });
      }

      if (
        property.owner.toString() !==
        req.user
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      await property.deleteOne();

      res.json({
        message:
          "Property deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };