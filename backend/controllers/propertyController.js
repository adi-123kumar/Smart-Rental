import Property from "../models/Property.js";

// =============================
// ADD NEW PROPERTY
// =============================
export const addProperty = async (req, res) => {
  try {
   const {
  title,
  location,
  price,
  type,
  description,
} = req.body;

    const property = await Property.create({
  title,
  location,
  price,
  type,
  description,
  image: req.file
    ? req.file.path
    : "",
  owner: req.user,
});

    res.status(201).json(property);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// GET ALL PROPERTIES
// =============================
export const getAllProperties = async (
  req,
  res
) => {
  try {
    const properties =
      await Property.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });

    res.json(properties);

  } catch (error) {
    res.status(500).json({
      message: error.message,
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
          message: "Property not found",
        });
      }

      res.json(property);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// =============================
// GET MY PROPERTIES
// =============================
export const getMyProperties = async (
  req,
  res
) => {
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
      message: error.message,
    });
  }
};

// =============================
// UPDATE PROPERTY
// =============================
export const updateProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only owner can edit
    if (
      property.owner.toString() !==
      req.user
    ) {
      return res.status(401).json({
        message:
          "Not authorized to edit",
      });
    }

    const updatedProperty =
      await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedProperty);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// DELETE PROPERTY
// =============================
export const deleteProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only owner can delete
    if (
      property.owner.toString() !==
      req.user
    ) {
      return res.status(401).json({
        message:
          "Not authorized to delete",
      });
    }

    await property.deleteOne();

    res.json({
      message:
        "Property deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};