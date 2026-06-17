import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import User from "../models/User.js";

// =========================
// CREATE BOOKING
// =========================
export const createBooking = async (
  req,
  res
) => {
  try {
    const { propertyId } = req.body;

    const property =
      await Property.findById(
        propertyId
      );

    if (!property) {
      return res.status(404).json({
        message:
          "Property not found",
      });
    }

    // Owner can't book own property
    if (
      property.owner.toString() ===
      req.user
    ) {
      return res.status(400).json({
        message:
          "You cannot book your own property",
      });
    }

    // Duplicate booking check
    const existingBooking =
      await Booking.findOne({
        property: propertyId,
        tenant: req.user,
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "Booking already exists",
      });
    }

    const booking =
      await Booking.create({
        property: property._id,
        tenant: req.user,
        owner: property.owner,
      });

    await User.findByIdAndUpdate(
      req.user,
      {
        $push: {
          bookings:
            booking._id,
        },
      }
    );

    res.status(201).json(
      booking
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// =========================
// USER BOOKINGS
// =========================
export const getMyBookings =
  async (req, res) => {
    try {
      const bookings =
        await Booking.find({
          tenant: req.user,
        })
          .populate(
            "property"
          )
          .sort({
            createdAt: -1,
          });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =========================
// OWNER BOOKINGS
// =========================
export const getOwnerBookings =
  async (req, res) => {
    try {
      const bookings =
        await Booking.find({
          owner: req.user,
        })
          .populate(
            "property"
          )
          .populate(
            "tenant",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =========================
// APPROVE BOOKING
// =========================
export const approveBooking =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      if (
        booking.owner.toString() !==
        req.user
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      booking.status =
        "Approved";

      await booking.save();

      await Property.findByIdAndUpdate(
        booking.property,
        {
          status: "Booked",
        }
      );

      res.json({
        message:
          "Booking approved",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =========================
// REJECT BOOKING
// =========================
export const rejectBooking =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      if (
        booking.owner.toString() !==
        req.user
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      booking.status =
        "Rejected";

      await booking.save();

      res.json({
        message:
          "Booking rejected",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };