import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addProperty,
  getAllProperties,
  getSingleProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllProperties);

router.get(
  "/my-properties",
  authMiddleware,
  getMyProperties
);

router.get("/:id", getSingleProperty);

// Add Property
router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  addProperty
);

// Update Property
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 10),
  updateProperty
);

// Delete Property
router.delete(
  "/:id",
  authMiddleware,
  deleteProperty
);

export default router;