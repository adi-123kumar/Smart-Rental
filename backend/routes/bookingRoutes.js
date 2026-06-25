import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

/*
=================================
TENANT ROUTES
=================================
*/

// Create Booking Request
router.post(
  "/",
  authMiddleware,
  createBooking
);

// My Bookings
router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

// Owner Bookings
router.get(
  "/owner-bookings",
  authMiddleware,
  getOwnerBookings
);

// Cancel Booking
router.put(
  "/:id/cancel",
  authMiddleware,
  cancelBooking
);

/*
=================================
OWNER ROUTES
=================================
*/

// Approve Request
router.put(
  "/:id/approve",
  authMiddleware,
  approveBooking
);

// Reject Request
router.put(
  "/:id/reject",
  authMiddleware,
  rejectBooking
);

/*
=================================
KEEP THIS LAST
=================================
*/

// Booking Details
router.get(
  "/:id",
  authMiddleware,
  getBookingById
);

export default router;