import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Multiple Images
    images: [
      {
        type: String,
      },
    ],

    // Property Details
    bedrooms: {
      type: Number,
      default: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
    },

    area: {
      type: Number,
      default: 0,
    },

    // Amenities
    amenities: {
      wifi: {
        type: Boolean,
        default: false,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      furnished: {
        type: Boolean,
        default: false,
      },

      ac: {
        type: Boolean,
        default: false,
      },

      balcony: {
        type: Boolean,
        default: false,
      },

      powerBackup: {
        type: Boolean,
        default: false,
      },
    },

    // Availability Status
    status: {
      type: String,
      enum: [
        "Available",
        "Booked",
        "Rented",
      ],
      default: "Available",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Property",
  propertySchema
);