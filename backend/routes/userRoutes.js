import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// ==========================
// GET PROFILE
// ==========================
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// ==========================
// UPDATE PROFILE
// ==========================
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

// ==========================
// CHANGE PASSWORD
// ==========================
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;