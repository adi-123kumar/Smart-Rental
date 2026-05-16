import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// 🔥 MIDDLEWARE (MUST COME FIRST)
app.use(cors());
app.use(express.json());

// ✅ ROUTES (AFTER middleware)
app.use("/api/auth", authRoutes);


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized 🔐",
    userId: req.user,
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});