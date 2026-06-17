import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createReview,
  getPropertyReviews,
} from "../controllers/reviewController.js";

const router =
  express.Router();

router.get(
  "/:id",
  getPropertyReviews
);

router.post(
  "/:id",
  authMiddleware,
  createReview
);

export default router;