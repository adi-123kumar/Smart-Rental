import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addProperty,
  getAllProperties,
  getSingleProperty,
} from "../controllers/propertyController.js";

const router = express.Router();


// Public routes
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);


// Protected route (must be logged in)
router.post(
  "/",
  authMiddleware,
  addProperty
);

export default router;