import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  googleAuth,
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password/:token",
  resetPassword
);
router.post("/google", googleAuth);

export default router;