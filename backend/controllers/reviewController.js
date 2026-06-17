import Review from "../models/Review.js";
import Property from "../models/Property.js";

export const createReview = async (
  req,
  res
) => {
  try {
    const {
      rating,
      comment,
    } = req.body;

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

    const alreadyReviewed =
      await Review.findOne({
        property:
          req.params.id,
        user: req.user,
      });

    if (alreadyReviewed) {
      return res.status(400).json({
        message:
          "Already reviewed",
      });
    }

    const review =
      await Review.create({
        property:
          req.params.id,
        user: req.user,
        rating,
        comment,
      });

    property.reviews.push(
      review._id
    );

    const reviews =
      await Review.find({
        property:
          req.params.id,
      });

    property.numReviews =
      reviews.length;

    property.averageRating =
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / reviews.length;

    await property.save();

    res.status(201).json(
      review
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getPropertyReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          property:
            req.params.id,
        })
          .populate(
            "user",
            "name profileImage"
          )
          .sort({
            createdAt: -1,
          });

      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };