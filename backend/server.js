import "./config/env.js";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js"; // ✅ ADD THIS
import authMiddleware from "./middleware/authMiddleware.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);
app.use(
  "/api/payments",
  paymentRoutes
);
app.use(
  "/api/reviews",
  reviewRoutes
);

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