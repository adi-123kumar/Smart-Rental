import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  approveBooking,
  rejectBooking,
} from "../controllers/bookingController.js";

const router =
  express.Router();

// Create booking
router.post(
  "/",
  authMiddleware,
  createBooking
);

// Tenant bookings
router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

// Owner bookings
router.get(
  "/owner-bookings",
  authMiddleware,
  getOwnerBookings
);

// Approve booking
router.put(
  "/:id/approve",
  authMiddleware,
  approveBooking
);

// Reject booking
router.put(
  "/:id/reject",
  authMiddleware,
  rejectBooking
);

export default router;