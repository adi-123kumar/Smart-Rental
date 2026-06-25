import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal Details

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
    },

    // Employment

    occupationType: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      default: "",
    },

    monthlyIncome: {
      type: Number,
      default: 0,
    },

    // Identity

    idType: {
      type: String,
      required: true,
    },

    idNumber: {
      type: String,
      required: true,
    },

    // Emergency Contact

    emergencyContactName: {
      type: String,
      required: true,
    },

    emergencyContactPhone: {
      type: String,
      required: true,
    },

    // Rental Details

    moveInDate: {
      type: Date,
      required: true,
    },

    leaseDuration: {
      type: Number,
      required: true,
    },

    numberOfOccupants: {
      type: Number,
      default: 1,
    },

    // Lifestyle

    hasPets: {
      type: Boolean,
      default: false,
    },

    smokingHabit: {
      type: Boolean,
      default: false,
    },

    vehicleCount: {
      type: Number,
      default: 0,
    },

    // Financial

    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    tenantMessage: {
      type: String,
      default: "",
    },

    ownerRemarks: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
      ],
      default: "Pending",
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Payment Pending",
        "Payment Completed",
        "Agreement Signed",
        "Moved In",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);