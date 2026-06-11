import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js"; // ✅ ADD THIS
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes); // ✅ ADD THIS

// Protected route
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

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});