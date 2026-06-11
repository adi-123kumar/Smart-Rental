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


// Public routes
router.get("/", getAllProperties);
router.get(
  "/my-properties",
  authMiddleware,
  getMyProperties
);
router.get("/:id", getSingleProperty);


// Protected route (must be logged in)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addProperty
);
router.put(
  "/:id",
  authMiddleware,
  updateProperty
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProperty
);

export default router;