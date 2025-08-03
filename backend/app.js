import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import spaceRoutes from "./routes/spaceRoute.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/space", protect, spaceRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Split Paying App API is running");
});

export default app;
